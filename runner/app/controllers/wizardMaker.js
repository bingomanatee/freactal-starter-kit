const path = require('path');
const child_process = require('child_process');
const pageProvider = require('./../../lib/models/pageProvider');

const ROOT = __dirname.replace(/.runner.app.*/, '');

function makeWizardPage(page, fileName) {
  return new Promise((resolve, fail) => {
    console.log('making page: ', page);
    const props = ['comp', `--name=${page.fileName}`, `--title="${page.title}"`, `--where=${fileName}`];
    console.log('making page with props:', props);
    const result = child_process.spawn('gulp', props, {
      cwd: ROOT,
    });
    result.on('exit', resolve);
    resolve();
  });
}

function makeWizard(title, name, where, panels) {
  (new Promise((resolve, reject) => {
    if (typeof panels !== 'string') panels = `'${JSON.stringify(panels)}"`;
    const props = ['wizard',
      `--name=${name}`,
      `--title="${title}"`,
      `--where=${where}`,
      `--panels=${panels}`,
    ];
    const result = child_process.spawn('gulp', props, {
      cwd: ROOT,
    });
    result.on('exit', () => {
      setTimeout(resolve, 1000); // wait to ensure writes.
    });

    result.stdout.on('data', (data) => {
      console.log('data: ', data.toString());
    });

    result.on('error', (error) => {
      console.log('error: ', error.message);
      reject();
    });
  }));
}

exports.make = async (ctx) => {
  const def = ctx.request.body;
  const { fileName, title, panels } = def;
  console.log('fileName: ', fileName);
  console.log('title:', title);
  console.log('panels:', panels);

  let where = '';
  let name = fileName;
  if (fileName.search('/') > -1) {
    where = path.dirname(fileName);
    name = path.basename(fileName);
  }
  console.log('creating wizard', name, title, where);
  try {
    await makeWizard(title, name, where, panels);
    await pageProvider.addPage({
      component: fileName,
      name: title,
      navTitle: title,
      published: true,
      route: `/wizard/${fileName.replace(/\//g, '-')}`,
    });
    await Promise.all(panels.map(page => makeWizardPage(page, fileName)));

    ctx.body = { success: true };
    ctx.status = 200;
  } catch (err) {
    console.log('error in make wizard: ', err.message);
  }
};
