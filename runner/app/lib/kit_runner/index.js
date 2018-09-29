const bottle = require('./bottle');

const myBottle = bottle();
const runner = new myBottle.container.KitRunner();

module.exports = runner;
