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
  const ROOT_BACK = `./${cWhere.split('/').slice(1).map(() => '..').join('/')}/`;

  containerNameValidator.try(name);
  const source = template('component');
  gulp.src(source)
    .pipe(rename((file) => {
      file.basename = file.basename.replace(/^ComponentName/, `${cName}`);
      return file;
    }))
    .pipe(modify(text => text.replace(/ComponentName/g, cName)
      .replace(/componentName/g, lcName)
      .replace(
        '../../src/components/css/shared',
        `${where.split('/').map(() => '..').join('/')}/css/shared`,
      )
      .replace(/SOURCE_ROOT/g, ROOT_BACK)))
    .pipe(gulp.dest(`./src/${cWhere}${cName}`));
});

gulp.task('wizardPanel', () => {
  const { name, where, panel } = minimist(process.argv.slice(2));
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  const cWhere = ensureEndingBackslash(where);
  if (!where) throw new Error('where missing');
  const ROOT_BACK = `./${cWhere.split('/').map(() => '..').join('/')}/`;
  const panelData = JSON.parse(_.trim(panel, "'"));

  const stateFields = (panelData.fields || [])
    .map(field => `componentNameState.add${_.upperFirst(field.type.replace('text', 'string'))}AndSetEffect('${field.name}');`)
    .join('\n');

  const destination = `src/${cWhere}/${cName}`;
  console.log('panel: ', panelData, 'dest:', destination);

  const wizardPanelFields = panelData.fields.map((field) => {
    const cFieldName = _.upperFirst(field.name);
    const cName = field.name;
    return `
    <Cell size={12} tabletSize={8} mobileSize={6}>
       <TextField id="${field.id}" value={state.${cName}} onChange={effects.onSet${cFieldName}} />
    </Cell>
    `;
  }).join('\n');

  containerNameValidator.try(name);
  const source = template('wizardPanel');
  gulp.src(source)
    .pipe(rename((file) => {
      file.basename = file.basename.replace(/^ComponentName/, `${cName}`);
      return file;
    }))
    .pipe(modify(text => text

      .replace(/componentFields/, stateFields)
      .replace(/wizardPanelFields/, wizardPanelFields)
      .replace(/ComponentName/g, cName)
      .replace(/componentName/g, lcName)
      .replace(
        '../../src/components/css/shared',
        `${cWhere.split('/').map(() => '..').join('/')}/css/shared`,
      )
      .replace(/SOURCE_ROOT/g, ROOT_BACK)))
    .pipe(gulp.dest(destination));
});

gulp.task('wizard', () => {
  let {
    name, where, title, panels,
  } = minimist(process.argv.slice(2));
  console.log('arguments; ', process.argv.slice(2));
  title = title.replace(/"/g, '');
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  console.log('panels: ', panels);
  const panelList = JSON.parse(_.trim(panels, "'\""));
  const cWhere = ensureEndingBackslash(where || 'components');

  containerNameValidator.try(name);
  containerNameValidator.try(cName);

  const panelImports = panelList.map(panel => `import ${panel.fileName} from "./${panel.fileName}";`)
    .join('\n');

  const panelMarkup = panelList.map((panel, i) => `<div title="${panel.title}">
   <${panel.fileName} panel={state.componentNameWizardController.panels[${i}]} />
</div>
`).join('');
  const source = template('wizard');
  const ROOT_BACK = `./${cWhere.split('/').map(() => '..').join('/')}/`;

  gulp.src(source)
    .pipe(rename((file) => {
      file.basename = file.basename.replace(/^ComponentName/g, `${cName}`);
      return file;
    }))
    .pipe(modify(text => text.replace(/ComponentName/g, cName)
      .replace(/WizardPanelImports/, panelImports)
      .replace(/WizardPanels/, panelMarkup)
      .replace(/componentName/g, lcName)
      .replace(/ComponentTitle/g, title)
      .replace('./../../src/', `${ROOT_BACK}`)
      .replace(/SOURCE_ROOT/g, ROOT_BACK)))
    .pipe(gulp.dest(`./src/${cWhere}${cName}`));
});

function componentToVariable(item) {
  return `Page${_.upperFirst(item.replace('components', '')
    .replace(/\//g, ''))}`;
}

gulp.task('mapComp', async () => {
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
