/* eslint-disable prefer-arrow-callback,camelcase */
const clusterModule = require('cluster');
const EventEmitterModule = require('eventemitter3');
const childProcessModule = require('child_process');
const { easyPropper } = require('class-propper');
const Bottle = require('bottlejs');
const workerRunner = require('./workerRunner');
const masterRunner = require('./masterRunner');

const processModule = process;

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
  kitBottle.constant('ROOT', `${__dirname}`.replace(/.runner.app.*/, ''));

  kitBottle.service('process', function () {
    return processModule;
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
        this.worker = cluster.fork();
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
    })
      .addInteger('state', { defaultValue: STATE_START, required: true });

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

  workerRunner(kitBottle);
  masterRunner(kitBottle);

  return kitBottle;
};

