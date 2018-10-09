/* eslint-disable prefer-arrow-callback,camelcase */
const { easyPropper } = require('class-propper');
const util = require('util');

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
        this.startHeartBeat();
      }

      startHeartBeat() {
        if (this.heartBeatTO) return;

        this.heartBeatTO = setInterval(() => {
          if (this.isStale) {
            this.stopHeartBeat();
            if (this.appProcess) {
              this.appProcess.once('exit', () => {
                process.exit();
              });
              this.appProcess.kill(0);
            } else {
              process.exit();
            }
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
        if (this.appProcess) return;
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
          this.appProcess.kill();
        }
      }

      stopWorker() {
        this.stopHeartBeat();
        if (this.appProcess) {
          this.appProcess.on('exit', () => {
            this.messageToMaster('UI stopped');
            process.nextTick(() => process.exit());
          });
          this.stopUI();
        } else {
          process.exit();
        }
      }

      updateHeartBeat() {
        this.lastAlive = Date.now();
      }

      messageFromMaster(message) {
        if (!message) {
          return;
        }
        const [msg, ...args] = message.split('/t');
        if (msg !== 'alive!') { log('message from master:', msg, args); }
        switch (msg) {
          case 'stop UI':
            this.stopUI(args);
            break;

          case 'start UI':
            this.startUI(args);
            break;

          case 'alive!':
            this.updateHeartBeat();
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
            if (old) {
              old.exit();
            }

            appProcess.stdout.on('data', (message) => {
              message.toString().split('\n').forEach(message => log('app stdout:', message));
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
