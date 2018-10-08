/* eslint-disable prefer-arrow-callback,camelcase */
const { easyPropper } = require('class-propper');

module.exports = (kitBottle) => {
  kitBottle.factory('KitRunnerWorker', ({
    STATE_START,
    STATE_WORKER_CREATED,
    STATE_WORKER_LISTENING,
    STATE_WORKING_STARTED,
    STATE_WORKING_APP_LAUNCHED,
    STATE_WORKING_ERROR,
    ROOT,
    process,
    log,
    child_process,
    EventEmitter,
  }) => {
    /**
     * note - this class manages both the conversation from the parent cluster
     * and the conversation from the child cluster; in effect two instances
     * of it talk to each other over the wire.
     */
    class KitRunnerWorker extends EventEmitter {
      constructor() {
        super();
        this.state = STATE_WORKING_STARTED;
        const self = this;
        this.messageToMaster('KitRunnerWorker created');
        process.on('message', (...args) => {
          self.messageFromMaster(...args);
        });
        setTimeout(() => this.startHeartBeat(), 5000);
      }

      startHeartBeat() {
        if (this.heartBeatTO) return;

        this.heartBeatTO = setInterval(() => {
          if (this.isStale) {
            this.stopHeartBeat();
            process.kill('SIGTERM');
          } else {
            this.sendHeartBeat();
          }
        }, 10000);
      }

      get isStale() {
        return (this.lastAlive && Date.now() - this.lastAlive > 20000);
      }

      sendHeartBeat() {
        this.messageToMaster('alive?');
      }

      stopHeartBeat() {
        if (this.heartBeatTO) {
          clearInterval(this.heartBeatTO);
          this.heartBeatTO = null;
        }
      }

      startUI() {
        log('starting yarn in ', ROOT);
        this.appProcess = child_process.spawn('yarn', ['start'], {
          env: Object.assign({}, process.env, { ADMIN_MODE: 1 }),
          cwd: ROOT,
        });
        this.state = STATE_WORKING_APP_LAUNCHED;
        this.messageToMaster('started UI');
      }

      stopUI() {
        if (this.appProcess) {
          this.appProcess.on('exit', () => {
            this.messageToMaster(('stopped UI'));
            this.appProcess = null;
          });
          this.appProcess.kill('SIGTERM');
        }
      }

      stopWorker() {
        this.stopHeartBeat();
        this.appProcess.on('exit', () => {
          this.messageToMaster('terminated');
          process.nextTick(() => process.disconnect());
        });
        this.stopUI();
      }

      messageFromMaster(message) {
        if (!message) {
          return;
        }
        const [msg, ...args] = message.split('/t');
        log('message from master:', message, args);
        switch (msg) {
          case 'start':
            this.startUI(args);
            this.startHeartBeat();
            break;

          case 'stop UI':
            this.stopUI(args);
            break;

          case 'start UI':
            this.startUI(args);
            break;

          case 'alive!':
            this.lastAlive = Date.now();
            break;

          case 'terminate':
            this.stopWorker();
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
    })
      .addInteger('state', { defaultValue: STATE_START, required: true })
      .addProp('appProcess', {
        onChange(appProcess, old) {
          if (appProcess) {
            // @TODO: clear old
            appProcess.stdout.on('data', (message) => {
              message.toString().split('\n').forEach(error => log('app stdout:', error));
            });
            appProcess.stderr.on('data', (message) => {
              message.toString().split('\n').forEach(error => log('app error:', error));
            });
            appProcess.on('close', (code) => {
              log(`app close: child process exited with code ${code}`);
            });
            appProcess.on('error', (error) => {
              log(`app error: child process error with ${error}`);
            });
          }
        },
      });

    return KitRunnerWorker;
  });
};
