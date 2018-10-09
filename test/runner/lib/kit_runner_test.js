/* eslint-disable prefer-arrow-callback,camelcase */
import clusterModule from 'cluster';
import childProcessModule from 'child_process';
import EventEmitter from 'eventemitter3';
import util from 'util';

const processModule = process;

clusterModule.on('fork', () => {
  console.log('---------- cluster module forked in test context');
  throw new Error('fork called');
});

processModule.on('message', (msg) => {
  console.log('--------- process message in test context', msg);
});

const kitRunnerBottle = require('./../../../runner/lib/kit_runner/bottle');

const delay = (n = 100) => new Promise(resolve => setTimeout(resolve, n));

describe('runner', () => {
  describe('lib', () => {
    describe('kit_runner', () => {
      let cluster;
      let process;
      let bottle;
      let child_process;
      let kitRunner;

      class MockWorker extends EventEmitter {
        constructor() {
          super();
          this.emitted = [];
          this.sent = [];
          this.MOCK = true;
          setTimeout(() => {
            this.messageToMaster('KitRunnerWorker created');
          });
        }

        emit(...args) {
          this.emitted.push(args);
          super.emit(...args);
        }

        send(...args) {
          this.sent.push(args);
          this.emit('message', ...args);
        }

        messageToMaster(...args) {
          this.emit('message', ...args);
        }
      }

      class MockCluster extends EventEmitter {
        constructor(isMaster) {
          super();
          this.forkCalled = 0;
          this.messages = 0;
          this.isMaster = isMaster;
          this.MOCK = true;
        }
        fork() {
          this.forkCalled += 1;
          return new MockWorker(this);
        }
      }

      class MockProcess extends EventEmitter {
        constructor() {
          super();
          MockProcess.nextID += 1;
          this.pid = MockProcess.nextID;
          this.sent = [];
        }

        send(...args) {
          this.sent.push([`process ${this.pid} recieved -->`, ...args]);
        }
      }
      MockProcess.nextID = 0;

      class MockChild extends EventEmitter {
        constructor() {
          super();
          this.stdout = new EventEmitter();
          this.stderr = new EventEmitter();
        }
      }

      class MockChildProcess {
        constructor() {
          this.execs = [];
        }

        spawn(...args) {
          this.execs.push(args);
          this._child = new MockChild();
          return this._child;
        }
      }

      function echo(msg, kitRunner) {
        console.log(`ECHO --------------(${msg})---------------------
        
ECHO child_process: ${util.inspect(child_process)}
ECHO process:${util.inspect(process)}
ECHO cluster: ${util.inspect(cluster)}
${kitRunner ? 'ECHO runner.worker ' : ''} ${kitRunner ? util.inspect(kitRunner.worker) : ''}

ECHO -----------------------------------
        
ECHO cluster.messages: ${util.inspect(cluster.messages)}
ECHO process.sent: ${util.inspect(process.sent)}

ECHO --------------( end${msg})---------------------`);
      }

      describe('worker', () => {
        beforeEach(() => {
          bottle = kitRunnerBottle();

          bottle.factory('child_process', () => new MockChildProcess());
          bottle.factory('process', () => new MockProcess());
          bottle.factory('cluster', () => new MockCluster(false));

          process = bottle.container.process;
          child_process = bottle.container.child_process;
          cluster = bottle.container.cluster;

          kitRunner = new bottle.container.KitRunner();
        });

        afterEach(() => {
          kitRunner.agent.stopHeartBeat();
        });

        it('should be running in worker context', () => {
          expect(cluster.isMaster).toBeFalsy();
        });

        it('should call child_process when the start signal is received', async () => {
          process.emit('message', 'start UI');
          await delay(100);
          expect(bottle.container.child_process.execs).toEqual([['yarn', ['start'], {
            cwd: '/Users/davidedelhart/Documents/repos/freactal-starter-kit/runner/lib/kit_runner',
            env: { ADMIN_MODE: 1 },
          }]]);
        });
      });

      describe('master', () => {
        beforeEach(() => {
          bottle = kitRunnerBottle();
          bottle.factory('child_process', () => new MockChildProcess());
          bottle.factory('process', () => new MockProcess());
          bottle.factory('cluster', () => new MockCluster(true));

          process = bottle.container.process;
          child_process = bottle.container.child_process;
          cluster = bottle.container.cluster;

          kitRunner = new bottle.container.KitRunner();
        });

        it('should be running in worker context', async () => {
          expect.assertions(1);
          await delay(100);
          expect(cluster.isMaster).toBeTruthy();
          echo('should be running in worker context', kitRunner);
        });

        it('should create a master runner', async () => {
          expect.assertions(1);
          await delay(100);
          expect(cluster.forkCalled).toEqual(1);
        });

        it('should send start UI to the fork', async () => {
          expect.assertions(1);
          await delay(200);
          expect(kitRunner.agent.worker.sent).toEqual([['start UI']]);
        });
      });
    });
  });
});
