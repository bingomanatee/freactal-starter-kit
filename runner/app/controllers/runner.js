

const kit = require('./../../lib/kit_runner');

exports.reload = (ctx) => {
  console.log('reloading ');
  kit.agent.askWorkerToStopWebAop();
  kit.agent.once('worker terminated', () => {
    kit.agent.createWorker();
  });
  ctx.body = { status: 'app reloaded' };
};

exports.stop = (ctx) => {
  console.log('stopping ');
  kit.agent.askWorkerToStopWebAop();
  kit.agent.once('worker terminated', () => {
    console.log('stopped Runner');
    process.exit();
  });
  ctx.body = { status: 'app stopped' };
};

exports.stopUI = (ctx) => {
  console.log('stopping ');
  kit.agent.askWorkerToStopUI();
  kit.agent.once('stopped UI', () => {
    console.log('stopped UI');
    kit.agent.askWorkerToStartUI();
    console.log('started UI');
  });
  ctx.body = { status: 'app stopped' };
};
