const fs = require('fs');
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

gulp.task('wizard', () => {
  let { name, where, title } = minimist(process.argv.slice(2));
  title = title.replace(/"/g, '');
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  const cWhere = ensureEndingBackslash(where || 'components');
  console.log('executing wizard ', cName, 'where:', cWhere, 'title: ', title);
  containerNameValidator.try(name);
  containerNameValidator.try(cName);
  const source = template('wizard');
  const ROOT_BACK = `./${cWhere.split('/').map(() => '..').join('/')}/`;
  gulp.src(source)
    .pipe(rename((file) => {
      file.basename = file.basename.replace(/^ComponentName/g, `${cName}`);
      return file;
    }))
    .pipe(modify(text => text.replace(/ComponentName/g, cName)
      .replace(/componentName/g, lcName)
      .replace(/ComponentTitle/g, title)
      .replace('./../../src/', `${ROOT_BACK}`)))
    .pipe(gulp.dest(`./src/${cWhere}${cName}`));
});

function componentToVariable(item) {
  return `Page${_.upperFirst(item.replace('components', '')
    .replace(/\//g, ''))}`;
}
gulp.task('mapComponents', async () => {
  const data = await fs.promises.readFile('./src/pageList.json');
  const pages = JSON.parse(data.toString()).pages;
  const imports = pages.map((page) => {
    const { published, component } = page;
    const componentVarName = componentToVariable(component);
    return `import ${componentVarName} from './${component}';`;
  }).join('\n');

  const maps = pages.map((page) => {
    const { published, component } = page;
    const componentVarName = componentToVariable(component);
    return `componentMap.set('${component}', ${componentVarName});`;
  }).join('\n');

  gulp.src(template('content'))
    .pipe(modify(text => text.replace('ComponentImports', imports)
      .replace('ComponentsMapping', maps)))
    .pipe(gulp.dest('./src/'));
});
