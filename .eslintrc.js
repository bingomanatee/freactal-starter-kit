const {Neutrino} = require('neutrino');
let lint = Neutrino({root: __dirname})
    .use('.neutrinorc.js')
    .call('eslintrc');

module.exports = lint;
