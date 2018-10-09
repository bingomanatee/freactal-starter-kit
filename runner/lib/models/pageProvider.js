const fs = require('fs');

const ROOT = __dirname.replace(/.runner.*/, '');
const PAGES_FILE = `${ROOT}/src/pageList.json`;

const pageProvider = {
  getPages() {
    return fs.promises.readFile(PAGES_FILE)
      .then(file => JSON.parse(file.toString()));
  },

  addPage(props) {
    return pageProvider.getPages()
      .then((data) => {
        props.id = data.pages.reduce((newId, page) => Math.max(newId, page.id) + 1, 1);
        data.pages.push(props);
        return fs.promises.writeFile(PAGES_FILE, JSON.stringify(data))
          .then(() => data);
      })
      .catch((err) => {
        console.log('error: ', err.message);
      });
  },
};

module.exports = pageProvider;
