/* eslint-disable func-names,object-shorthand */
import cp, { Validator } from 'class-propper';
import EventEmitter from 'eventemitter3';
import util from 'util';
import WizardControllerPanel from './WizardControllerPanel';
const orderValidator = new Validator([
  new Validator('integer', 'order must be an integer'),
  new Validator(s => s < 0, 'order must be >= 0'),
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
      panel.removeListener('change');
      panel.on('change', (...args) => {
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

  get errors() {

    const out = this.propErrors || [];
    return out;
  }

  toJSON() {
    console.log('toJSON from ', this);
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
  failsWhen: 'array',
  defaultValue: () => [],
  onChange: function (panels) {
    //  this._panels.forEach(panel => this.emit('panel removed', panel));
    if (panels && Array.isArray) {
      panels.forEach((panel) => {
        this._initPanel(panel);
      });
    }
    console.log('panels set');
    this.emit('panel changed', { panels });
  },
})
  .addString('fileName', {
    required: true,
  })
  .addString('title', {
    required: true,
  })
  .addProp('index', {
    defaultValue: 0,
    onChange: function (index, old) {
      this.emit('index changed', { index, old });
    },
  })
  .addProp('panelClass', {
    defaultValue: 'wizardPanel',
  })
  .addProp('mainClass', {
    defaultValue: 'wizard',
  });


export default WizardController;
