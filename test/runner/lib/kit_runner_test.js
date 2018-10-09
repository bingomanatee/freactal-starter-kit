/* eslint-disable prefer-arrow-callback,camelcase */
import EventEmitter from 'eventemitter3';

const kitRunnerBottle = require('./../../../runner/lib/kit_runner/bottle');

const delay = (n = 100) => new Promise(resolve => setTimeout(resolve, n));

describe('runner', () => {
  describe('lib', () => {
    describe('kit_runner', () => {
      let cluster;
      let process;
      let bottle;
      let child_process;

      describe('worker', () => {
        beforeEach(() => {
          bottle = kitRunnerBottle();
          bottle.factory('cluster', () => {
            const mockCluster = new EventEmitter();
            mockCluster.isMaster = false;
            return mockCluster;
          });

          class MockProcess extends EventEmitter {
            constructor() {
              super();
              this.sent = [];
            }

            send(...args) {
              this.sent.push(args);
            }
          }

          class MockChildProcess {
            constructor() {
              this.execs = [];
            }

            spawn(...args) {
              this.execs.push(args);
              return Object.assign(new EventEmitter(), {
                stdout: new EventEmitter(),
                stderr: new EventEmitter(),
              });
            }
          }

          bottle.factory('child_process', function () {
            return new MockChildProcess();
          });
          bottle.factory('process', function () {
            return new MockProcess();
          });

          process = bottle.container.process;
        });

        it('should call child_process when the start signal is received', async () => {
          const kitRunner = new bottle.container.KitRunner();
          process.emit('message', 'start');
          await delay(100);
          expect(bottle.container.child_process.execs).toEqual([['yarn', ['start'], {
            cwd: '/Users/davidedelhart/Documents/repos/freactal-starter-kit/runner/lib/kit_runner',
            env: { ADMIN_MODE: 1 },
          }]]);
        });
      });

      describe('master', () => {
        beforeEach(() => {
          class MockWorker extends EventEmitter {
            constructor() {
              console.log('mock worker created');
              super();
              this.emitted = [];
              this.sent = [];
              setTimeout(() => {
                this.emit('KitRunnerWorker created');
              });
            }

            emit(...args) {
              this.emitted.push(args);
              super.emit(...args);
            }

            send(...args) {
              console.log('worker sent: ', args);
              this.sent.push(args);
            }
          }

          bottle = kitRunnerBottle();

          bottle.factory('cluster', () => {
            const mockCluster = new EventEmitter();

            mockCluster.forkCalled = 0;
            mockCluster.fork = () => {
              mockCluster.forkCalled += 1;
              return new MockWorker();
            };
            mockCluster.messages = [];
            mockCluster.isMaster = true;

            return mockCluster;
          });

          class MockProcess extends EventEmitter {
            constructor() {
              super();
              this.sent = [];
            }

            send(...args) {
              this.sent.push(args);
            }
          }

          bottle.factory('process', function () {
            return new MockProcess();
          });

          class MockChildProcess {
            constructor() {
              this.execs = [];
            }

            spawn(...args) {
              console.log('---- child process spawn called with ', args);
              this.execs.push(args);
              return Object.assign(new EventEmitter(), {
                stdout: new EventEmitter(),
                stderr: new EventEmitter(),
              });
            }
          }

          bottle.factory('child_process', function () {
            return new MockChildProcess();
          });

          cluster = bottle.container.cluster;
          process = bottle.container.process;
          child_process = bottle.container.child_process;
        });

        it('should create a master runner', () => {
          const kitRunner = new bottle.container.KitRunner();
          expect(cluster.forkCalled).toEqual(1);
        });

        it('should send start to the fork', async () => {
          expect.assertions(1);
          const kitRunner = new bottle.container.KitRunner();
          await delay(100);
          console.log('messages: ', cluster.messages);
          console.log('process.sent: ', process.sent);
          console.log('child_process: ', child_process);
          expect(kitRunner.agent.worker.sent).toEqual([['start']]);
        });
      });
    });
  });
});
