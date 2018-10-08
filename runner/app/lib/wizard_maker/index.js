const bottle = require('./bottle');
const cluster = require('cluster');

const myBottle = bottle();
const runner = new myBottle.container.KitRunner();
console.log('isMaster:', cluster.isMaster, 'runner worker:', runner.agent.worker);
module.exports = runner;
