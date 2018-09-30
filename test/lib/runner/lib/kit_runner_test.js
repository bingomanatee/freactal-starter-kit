/* eslint-disable prefer-arrow-callback */
import EventEmitter from 'eventemitter3';

const kitRunnerBottle = require('./../../../../runner/app/lib/kit_runner/bottle');

const delay = (n = 100) => new Promise(resolve => setTimeout(resolve, n));

describe('runner', () => {
  describe('lib', () => {
    describe('kit_runner', () => {
      let cluster;
      let process;
      let bottle;
      let mockWorker;


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
            exec(...args) {
              this.execs.push(args);
              return new Promise((resolve) => {
                resolve({
                  stdout: {},
                  stderr: {},
                });
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
          expect(bottle.container.child_process.execs).toEqual([
            ['cd', [bottle.container.ROOT]],
            ['neutrino', ['start']],
          ]);
        });
      });

      describe('master', () => {
        beforeEach(() => {
          class MockWorker extends EventEmitter {
            constructor() {
              super();
              this.emitted = [];
              this.sent = [];
              process.nextTick(() => {
                this.emit('listening');
              });
            }

            emit(...args) {
              this.emitted.push(args);
              super.emit(...args);
            }

            send(...args) {
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

          cluster = bottle.container.cluster;
          process = bottle.container.process;
        });

        it('should create a worker', () => {
          const kitRunner = new bottle.container.KitRunner();
          expect(cluster.forkCalled).toEqual(1);
        });

        it('should send start to the fork', async () => {
          expect.assertions(1);
          const kitRunner = new bottle.container.KitRunner();
          await delay(100);
          expect(kitRunner.agent.worker.sent).toEqual([['start']]);
        });
      });
    });
  });
});
