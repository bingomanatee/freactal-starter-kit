const fs = require('fs');

const ROOT = __dirname.replace(/.runner.app.*/, '');
exports.all = async (ctx) => {
  const file = await fs.promises.readFile(`${ROOT}/src/lib/models/content/pageList.json`);
  ctx.body = file.toString();
  ctx.type = 'json';
};
