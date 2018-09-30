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
        this.messageToWorker('start');
      }

      askWorkerToStopWebAop() {
        this.messageToWorker('stop');
      }

      messageToWorker(...args) {
        log('master: sending ', args);
        this.worker.send(...args);
      }

      messageFromWorker(message) {
        log('master: recieved ', message, 'from worker');

        switch (message) {
          case 'KitRunnerWorker created':
            this.askWorkerToLaunchWebAop();
            break;

          default:
            console.log('unresponded message: ', message);
        }
      }
    }

    const cp = easyPropper(KitRunnerMaster);

    cp.addInteger('state', { defaultValue: STATE_START, required: true });

    return KitRunnerMaster;
  });
};
