const fs = require('fs');
const _ = require('lodash');

const ROOT = __dirname.replace(/.runner.*/, '');
const PAGES_FILE = `${ROOT}/src/pageList.json`;

function remapComponents() {
  return (new Promise((resolve, reject) => {
    const result = child_process.spawn('mapComp', {
      cwd: ROOT,
    });
    console.log('remapComponents spawned');
    result.on('exit', () => {
      console.log('makeWizard complete');
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

const pageProvider = {
  getPages() {
    return fs.promises.readFile(PAGES_FILE)
      .then(file => JSON.parse(file.toString()));
  },

  remapComponents,

  addPage(props) {
    return pageProvider.getPages()
      .then((data) => {
        console.log('data retrieved: ', data);
        if (props.route) {
          const oldPage = _.find(data.pages, { route: props.route });
          if (oldPage) {
            Object.assign(oldPage, props, { id: oldPage.id });
            return data;
          }
        }

        props.id = data.pages.reduce((newId, page) => Math.max(newId, page.id) + 1, 1);
        data.pages.push(props);
        return data;
      })
      .then((data) => {
        console.log('data updated: ', data);
        return data;
      })
      .then(data => fs.promises.writeFile(PAGES_FILE, JSON.stringify(data))
        .then(() => data))
      .then(async (data) => {
        await pageProvider.remapComponents();
        console.log('components remapped');
        return data;
      })
      .catch((err) => {
        console.log('pageProvider.addPage error: ', err.message);
      });
  },
};

module.exports = pageProvider;
