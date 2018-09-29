import EventEmitter from 'eventemitter3';

const kitRunnerBottle = require('./../../../../runner/app/lib/kit_runner/bottle');

describe('runner', () => {
  describe('lib', () => {
    describe('kit_runner', () => {
      let cluster;
      let process;
      let bottle;
      let mockWorker;

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
          await new Promise(resolve => setTimeout(resolve, 100));
          expect(kitRunner.worker.sent).toEqual([['start']]);
        });
      });
    });
  });
});
