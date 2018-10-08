/* eslint-disable prefer-arrow-callback,camelcase */
const { easyPropper } = require('class-propper');

module.exports = (kitBottle) => {
  kitBottle.factory('KitRunnerMaster', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    cluster,
    EventEmitter,
    log,
  }) => {
    class KitRunnerMaster extends EventEmitter {
      constructor(start = true) {
        super();
        if (start) {
          this.createWorker();
        }
      }

      createWorker() {
        log('creating worker');
        this.state = STATE_WORKER_CREATED;
        const self = this;
        this.worker = cluster.fork();
        this.worker
          .on('message', (message) => {
            self.messageFromWorker(message);
          })
          .on('error', (message) => {
            log('fork error: ', message);
          });
      }

      askWorkerToLaunchWebAop() {
        if (!this.worker) this.createWorker();
        else { this.messageToWorker('start'); }
      }

      askWorkerToStopWebAop() {
        this.messageToWorker('terminate');
      }

      askWorkerToStopUI() {
        this.messageToWorker('stop UI');
      }

      askWorkerToStartUI() {
        this.createWorker();
      }

      messageToWorker(...args) {
        if (!this.worker) {
          return log('master: cannot send message - no worker', ...args);
        }
        log('master: sending ', args);
        this.worker.send(...args);
      }

      messageFromWorker(message) {
        log('master: received ', message, 'from worker');

        switch (message) {
          case 'KitRunnerWorker created':
            this.askWorkerToLaunchWebAop();
            break;

          case 'stopped UI':
            console.log('stopped child UI process');
            this.emit('stopped UI');
            this.worker.kill('SIGTERM');
            this.worker = null;
            break;

          case 'terminated':
            console.log('stopped worker');
            this.worker.kill('SIGTERM');
            this.worker.on('exit', () => {
              this.emit('worker terminated');
            });
            break;

          case 'alive?':
            this.messageToWorker('alive!');
            break;

          case 'terminate':
            console.log('worker terminated');
            break;

          default:
            console.log('master: unresponded message from worker: ', message);
        }
      }
    }

    const cp = easyPropper(KitRunnerMaster);

    cp.addInteger('state', { defaultValue: STATE_START, required: true });

    return KitRunnerMaster;
  });
};
