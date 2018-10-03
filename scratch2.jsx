const _ = require('lodash');
const pv = new Map();

pv.set('(', ')');
pv.set('{', '}');
pv.set('[', ']');
pv.set('<', '>');

const cv = ')>}]'.split('');

const checkParensOld = (string) => {
  return ! _(string.split(''))
    .map((a) => {
      return pv.has(a) ? pv.get(a) : 0
    })
    .reduce((h, value) => {
      if (h < 0) return h;
      return h + value;
    }, 0);
}

const checkParens = (string) => {
  let parens = string.split('').filter((a) => pv.has(a) || cv.includes(a));
  while(parens.length) {
    let firstClose = _.findIndex(parens, (a) => cv.includes(a));
    if (firstClose <= 0) return false;
    let p = parens[firstClose];
    let prev = parens[firstClose -1];
    if (!(pv.get(prev) === p)) return false;
    parens.splice(firstClose - 1, 2);
  }
  return true;
}

console.log(checkParens("(safsd(dafsd)dfaf)"))
