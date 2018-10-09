const path = require('path');
const child_process = require('child_process');
const pageProvider = require('./../../lib/models/pageProvider');

const ROOT = __dirname.replace(/.runner.app.*/, '');

exports.make = async (ctx) => {
  const def = ctx.request.body;
  const { fileName, title, pages } = def;
  console.log('fileName: ', fileName);
  console.log('title:', title);
  console.log('pages:', pages);

  let where = '';
  let name = fileName;
  if (fileName.search('/') > -1) {
    where = path.dirname(fileName);
    name = path.basename(fileName);
  }
  ctx.status = 200;
  console.log('creating wizard', name, title, where);
  await (new Promise((resolve, reject) => {
    const props = `wizard,--name=${name},--title="${title}",--where=${where}`.split(',');
    console.log('props: ', props);
    const result = child_process.spawn('gulp', props, {
      cwd: ROOT,
    });
    result.on('exit', () => {
      console.log('done with wizard');
      ctx.body = { success: true };
      pageProvider.addPage({
        component: fileName,
        name: title,
        navTitle: title,
        published: true,
        route: `wizard/${fileName.replace(/\//g, '-')}`,
      }).then(resolve);
    });

    result.stdout.on('data', (data) => {
      console.log('data: ', data.toString());
    });

    result.on('error', (error) => {
      console.log('error: ', error.message);
      reject();
    });
  }));
};
