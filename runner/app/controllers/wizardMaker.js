const path = require('path');
const child_process = require('child_process');

exports.make = (ctx) => {
  const def = ctx.request.body;
  const { fileName, title, pages } = def;
  console.log('fileName: ', fileName);
  console.log('title:', title);
  console.log('pages:', pages);

  let where = '';
  let name = fileName;
  if (fileName.search('/') > -1) {
    where = path.dirname(fileName);
    name = path.baseName(fileName);
  }

  child_process.exec(`gulp wizard --name=${name} --title=${title} ${where ? (` --where=${where}`) : ''}`);
};
