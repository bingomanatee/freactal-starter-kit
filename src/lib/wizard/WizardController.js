/* eslint-disable func-names,object-shorthand */
import cp, { Validator } from 'class-propper';
import EventEmitter from 'eventemitter3';
import util from 'util';
import WizardControllerPanel from './WizardControllerPanel';

const orderValidator = new Validator([
  new Validator('integer', 'order must be an integer'),
  new Validator(s => s < -1, 'order must be >= -1'),
]);

class WizardController extends EventEmitter {
  constructor(title, config = {}) {
    super();
    this.title = title;
    Object.assign(this, config);
  }

  addPanel(...args) {
    let panel;
    if (typeof args[0] === 'object') {
      panel = args[0];
    } else {
      panel = new WizardControllerPanel(...args);
    }
    this._initPanel(panel);
    this.panels = this.panels.concat([panel]);
    return this;
  }

  addPanelAt(order, title, config) {
    try {
      orderValidator.try(order);
    } catch (err) {
      console.log('bad order: ', order);
      return;
    }
    const panel = new WizardControllerPanel(title, config);
    this._initPanel(panel);
    const newPanels = this.panels.slice(0);
    newPanels.splice(order + 1, 0, panel);
    this.panels = _.compact(newPanels);
  }

  _initPanel(panel) {
    try {
      panel.controller = this;
      this.emit('panel added', panel);
      panel.removeListener('changed');
      panel.on('changed', (...args) => {
        this.emit('panel changed', args);
      });
    } catch (err) {
      console.log('error initializing panel: ', err.message, util.inspect(panel));
    }
  }

  nextPage() {
    this.index = this.index + 1;
  }
  nextPanel() {
    this.index = this.index + 1;
  }

  get panelErrors() {
    const errors = _(this.panels)
      .map('propErrors')
      .compact()
      .value();

    const sameTitles = _(this.panels)
      .map('title')
      .compact()
      .groupBy(_.identity)
      .values()
      .filter(set => set.length > 1)
      .map(set => set[0])
      .value();

    const sameFileNames = _(this.panels)
      .map('fileName')
      .compact()
      .groupBy(_.identity)
      .values()
      .filter(set => set.length > 1)
      .map(set => set[0])
      .value();

    if (sameTitles.length) {
      errors.push({
        prop: 'panels',
        value: sameTitles.join(','),
        error: `Duplicate titles: ${sameTitles.map(t => `"${t}"`).join(', ')}`,

      });
    }
    if (sameFileNames.length) {
      errors.push({
        prop: 'panels',
        value: sameFileNames.join(','),
        error: `Duplicate fileNames: ${sameFileNames.map(t => `"${t}"`).join(', ')}`,

      });
    }

    return errors;
  }

  get panelIsValid() {
    return this.panelErrors.length < 1;
  }

  get errors() {
    const out = this.propErrors || [];
    return out;
  }

  toJSON() {
    return {
      title: this.title,
      fileName: this.fileName,
      panels: this.panels.map(panel => panel.toJSON()),
    };
  }
}

WizardController.fromJSON = (data) => {
  const controller = new WizardController(data.title, data);
  if (data.panels && Array.isArray(data.panels)) {
    data.panels.forEach((panel) => {
      controller.addPanel(WizardControllerPanel.fromJSON(panel, controller));
    });
  }
  return controller;
};

const propper = cp(WizardController);
propper.addIsValid();

propper.addProp('panels', {
  type: 'array',
  defaultValue: () => [],
  onChange: function (panels) {
    //  this._panels.forEach(panel => this.emit('panel removed', panel));
    if (panels && Array.isArray) {
      panels.forEach((panel) => {
        this._initPanel(panel);
      });
    }
    this.emit('panel changed', { panels });
  },
})
  .addString('fileName', {
    required: true,
    onBadData: function (field, value, err) { this.emit('error', { field, value, error: err }); return true; },
  })
  .addString('title', {
    required: true,
    onBadData: function (field, value, err) { this.emit('error', { field, value, error: err }); return true; },
  })
  .addProp('index', {
    type: 'integer',
    defaultValue: 0,
    onChange: function (index, old) {
      this.emit('index changed', { index, old });
    },
  })
  .addString('panelClass', {
    defaultValue: 'wizardPanel',
  })
  .addString('mainClass', {
    defaultValue: 'wizard',
  });


export default WizardController;
