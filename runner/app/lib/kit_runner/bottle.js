const clusterModule = require('cluster');
const EventEmitter = require('eventemitter3');
const { easyPropper } = require('class-propper');
const Bottle = require('bottlejs');

export default() => {
  const kitBottle = new Bottle();

  kitBottle.constant('STATE_START', 0);
  kitBottle.constant('STATE_WORKER_CREATED', 1);
  kitBottle.constant('STATE_WORKER_LISTENING', 2);
  kitBottle.constant('process', process);
  kitBottle.constant('cluster', clusterModule);
  kitBottle.constant('log', (...args) => console.log(...args));
  kitBottle.factory('KitRunner', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    process,
    cluster,
    log,
  }) => {
    class KitRunner extends EventEmitter {
      constructor(start = true) {
        super();
        this.isMaster = cluster.isMaster;

        if (start) {
          if (this.isMaster) {
            this.startWorker();
          } else {
            this.listenToMaster();
          }
        }
      }

      startWorker() {
        this.state = STATE_WORKER_CREATED;
        this.worker = cluster.fork();
      }

      listenToMaster() {
        process.on('message', (msg) => {
          this.messageFromMaster(msg);
        });
      }

      askWorkerToLaunchWebAop() {
        this.messageToWorker('start');
      }

      messageFromWorker(message) {
        log('worker message: ', message);
      }

      messageToWorker(message) {
        if (this.worker) {
          this.worker.send(message);
          return true;
        }
        this.emit('error', {
          message: 'cannot send message',
          params: {
            message,
            reason: 'no worker',
          },
        });
        return false;
      }

      messageFromMaster(message) {
        const [msg, ...args] = message.split('/t');

        switch (msg) {
          case 'start':
            this.startWorker(args);
            break;

          default:
            this.messageToMaster('error', 'cannot understand message', message);
        }
      }

      messageToMaster(...args) {
        process.send(args.join('/t'));
      }
    }

    const cp = easyPropper(KitRunner);

    cp.addObject('worker', {
      onChange(worker) {
        const self = this;
        worker.on('listening', () => {
          self.state = STATE_WORKER_LISTENING;
          self.askWorkerToLaunchWebAop();
        });
        worker.on('message', (message) => {
          this.messageFromWorker(message);
        });
      },
    }).addInteger('state', { defaultValue: STATE_START, required: true })
      .addBoolean('isMaster');

    return KitRunner;
  });
};

