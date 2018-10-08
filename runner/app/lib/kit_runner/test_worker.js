const { onExit } = require('@rauschma/stringio');
const bottleFactory = require('./bottle');

function main() {
  const bottle = bottleFactory();
  bottle.decorator('process', (process) => {
    process.send = () => {};
    return process;
  });

  const kitRunnerWorker = new bottle.container.KitRunnerWorker();
  process.emit('message', 'start');
  setTimeout(() => {
    console.log('killing appProcess', kitRunnerWorker.appProcess.pid);
    kitRunnerWorker.stopWorker();
    console.log('process closed');
    setTimeout(() => {
      console.log('starting app again');
      kitRunnerWorker.startUI();
      setTimeout(() => {
        console.log('killing appProcess');
        console.log(kitRunnerWorker.appProcess.pid);
        kitRunnerWorker.stopWorker();
      }, 1000 * 10);
    }, 1000 * 4);
  }, 1000 * 20);
}

main();
