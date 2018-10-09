const pageProvider = require('./../../lib/models/pageProvider');

exports.all = async (ctx) => {
  const file = await pageProvider.getPages();
  ctx.body = file;
  ctx.type = 'json';
};
