const gulp = require('gulp');
const path = require('path');
const minimist = require('minimist');
const _ = require('lodash');

const { Validator } = require('class-propper');
const rename = require('gulp-rename');
const modify = require('gulp-modify-file');

const template = folder => path.resolve(__dirname, 'templates', `${folder}/**/*`);

const containerNameValidator = new Validator([
  new Validator('string', 'name must be a string'),
  new Validator(s => s.length < 1, 'name must be nonempty'),
]);

const ensureEndingBackslash = str => `${(str || '').replace(/\/$/, '')}/`;

gulp.task('comp', () => {
  const { name, where } = minimist(process.argv.slice(2));
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  const cWhere = ensureEndingBackslash(where || 'components');

  containerNameValidator.try(name);
  const source = template('component');
  gulp.src(source)
    .pipe(rename((file) => {
      file.basename = file.basename.replace(/^ComponentName/, `${cName}`);
      return file;
    }))
    .pipe(modify(text => text.replace(/ComponentName/g, cName)
      .replace(/componentName/g, lcName)
      .replace('../../src/components/css/shared', '../css/shared')))
    .pipe(gulp.dest(`./src/${cWhere}${cName}`));
});
