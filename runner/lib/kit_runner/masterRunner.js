/* eslint-disable prefer-arrow-callback,camelcase */
const { easyPropper } = require('class-propper');

module.exports = (kitBottle) => {
  kitBottle.factory('KitRunnerMaster', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    cluster,
    EventEmitter,
    process,
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
        this.state = STATE_WORKER_CREATED;
        const self = this;
        this.worker = cluster.fork();
        this.worker
          .on('message', (message) => {
            self.messageFromWorker(message);
          })
          .on('error', (message) => {
            log('master:fork error: ', message);
          });
      }

      askWorkerToLaunchWebAop() {
        if (!this.worker) this.createWorker();
        else { this.messageToWorker('start UI'); }
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
          log('master: cannot send message - no worker', ...args);
          return;
        }
        this.worker.send(...args);
      }

      messageFromWorker(message) {
        if (message !== 'alive?') { log('::::::::: master: received ', message, 'from worker'); }

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

          case 'started UI':
            console.log('React UI listening on port 5000');
            break;

          case 'UI stopped':
            console.log('worker UI subprocess stopped');
            this.worker.kill('SIGTERM');
            this.worker.on('exit', () => {
              this.emit('worker terminated');
            });
            break;

          case 'alive?':
            this.messageToWorker('alive!');
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
