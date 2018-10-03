

const kit = require('./../lib/kit_runner');

exports.reload = (ctx) => {
  console.log('reloading ');
  kit.agent.askWorkerToStopWebAop();
  setTimeout(() => {
    kit.agent.askWorkerToLaunchWebAop();
  }, 2000);
  ctx.body = { status: 'app reloaded' };
};

exports.stop = (ctx) => {
  console.log('stopping ');
  kit.agent.askWorkerToStopWebAop();
  kit.once('stopped UI', () => process.kill('SIGTERM'));
  ctx.body = { status: 'app stopped' };
};
