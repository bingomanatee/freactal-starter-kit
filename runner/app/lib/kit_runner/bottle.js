/* eslint-disable prefer-arrow-callback,camelcase */
const clusterModule = require('cluster');
const EventEmitterModule = require('eventemitter3');
const childProcessModule = require('child-process-promise');
const { easyPropper } = require('class-propper');
const Bottle = require('bottlejs');

module.exports = () => {
  const kitBottle = new Bottle();

  kitBottle.constant('EventEmitter', EventEmitterModule);
  kitBottle.constant('STATE_START', 0);
  kitBottle.constant('STATE_WORKER_CREATED', 1);
  kitBottle.constant('STATE_WORKER_LISTENING', 2);
  kitBottle.constant('STATE_WORKING_CREATED', 100);
  kitBottle.constant('STATE_WORKING_STARTED', 101);
  kitBottle.constant('STATE_WORKING_APP_LAUNCHED', 102);
  kitBottle.constant('STATE_WORKING_ERROR', 199);
  kitBottle.constant('ROOT', `${__dirname}`.replace(/runner.app.*/, ''));

  kitBottle.service('process', function () {
    return process;
  });
  kitBottle.service('child_process', function () {
    return childProcessModule;
  });
  kitBottle.service('cluster', function () {
    return clusterModule;
  });
  kitBottle.service('log', function () {
    return (...args) => console.log(...args);
  });

  kitBottle.factory('KitRunnerMaster', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    cluster,
    log,
    EventEmitter,
  }) => {
    class KitRunnerMaster extends EventEmitter {
      constructor(start = true) {
        super();
        if (start) this.createWorker();
      }

      createWorker() {
        this.state = STATE_WORKER_CREATED;
        this.worker = cluster.fork();
      }

      askWorkerToLaunchWebAop() {
        this.messageToWorker('start');
      }

      messageToWorker(message) {
        this.worker.send(message);
      }
    }

    const cp = easyPropper(KitRunnerMaster);

    cp.addObject('worker', {
      onChange(worker) {
        const self = this;
        worker.on('listening', () => {
          if (self.state === STATE_WORKER_CREATED) {
            self.state = STATE_WORKER_LISTENING;
            self.askWorkerToLaunchWebAop();
          }
        });
        worker.on('message', (message) => {
          this.messageFromWorker(message);
        });
      },
    }).addInteger('state', { defaultValue: STATE_START, required: true });

    return KitRunnerMaster;
  });

  kitBottle.factory('KitRunner', ({
    KitRunnerMaster,
    KitRunnerWorker,
    cluster,
  }) => {
    /**
     * note - this class manages both the conversation from the parent cluster
     * and the conversation from the child cluster; in effect two instances
     * of it talk to each other over the wire.
     */
    class KitRunner {
      constructor(start = true) {
        this.isMaster = cluster.isMaster;

        if (start) {
          this.start();
        }
      }

      start() {
        if (this.isMaster) {
          this.startMaster();
        } else {
          this.startWorker();
        }
      }

      startMaster() {
        this.agent = new KitRunnerMaster();
      }

      startWorker() {
        this.agent = new KitRunnerWorker();
      }
    }

    return KitRunner;
  });
  kitBottle.factory('KitRunnerWorker', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    STATE_WORKING_STARTED,
    STATE_WORKING_APP_LAUNCHED,
    STATE_WORKING_ERROR,
    ROOT,
    process,
    child_process,
    EventEmitter,
  }) => {
    /**
     * note - this class manages both the conversation from the parent cluster
     * and the conversation from the child cluster; in effect two instances
     * of it talk to each other over the wire.
     */
    class KitRunnerWorker extends EventEmitter {
      constructor(start = true) {
        super();
        if (start) {
          this.startWorker();
        }
      }

      startWorker() {
        this.state = STATE_WORKING_STARTED;
        process.on('message', (msg) => {
          this.messageFromMaster(msg);
        });
      }

      workerStartApp() {
        child_process.exec('cd', [ROOT])
          .then(() => child_process.exec('neutrino', ['start']))
          .then((result) => {
            this.appProcess = result;
            this.state = STATE_WORKING_APP_LAUNCHED;
            this.messageToMaster('app started');
          })
          .catch((err) => {
            this.state = STATE_WORKING_ERROR;
            this.messageToMaster('error', {
              message: 'cannot start app',
              params: err,
            });
          });
      }

      messageFromMaster(message) {
        if (!message) {
          return;
        }
        const [msg, ...args] = message.split('/t');

        switch (msg) {
          case 'start':
            this.workerStartApp(args);
            break;

          default:
            this.messageToMaster('error', 'cannot understand message', message);
        }
      }

      messageToMaster(...args) {
        process.send(args.join('/t'));
      }
    }

    const cp = easyPropper(KitRunnerWorker);

    cp.addObject('worker', {
      onChange(worker, old) {
        const self = this;
        if (old) {
          old.removeAllListeners('listening');
          old.removeAllListeners('message');
        }
        worker.on('listening', () => {
          if (self.state === STATE_WORKER_CREATED) {
            self.state = STATE_WORKER_LISTENING;
            self.askWorkerToLaunchWebAop();
          }
        });
        worker.on('message', (message) => {
          this.messageFromWorker(message);
        });
      },
    }).addInteger('state', { defaultValue: STATE_START, required: true })
      .addObject('appProcess');

    return KitRunnerWorker;
  });

  return kitBottle;
};

