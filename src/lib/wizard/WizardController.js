/* eslint-disable func-names,object-shorthand */
import cp, { Validator } from 'class-propper';
import EventEmitter from 'eventemitter3';
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
    this.panels.push(panel);
    return this;
  }

  addPanelAt(order, ...args) {
    orderValidator.try(order);
    let panel;
    if (typeof args[0] === 'object') {
      panel = args[0];
    } else {
      panel = new WizardControllerPanel(...args);
    }
    this._initPanel(panel);
    this.panels.splice(order + 1, 0, panel);
    this.panels = _.compact(this.panels);
  }

  _initPanel(panel) {
    panel.controller = this;
    this.emit('panel added', panel);
  }

  nextPage() {
    this.index = this.index + 1;
  }
}

const propper = cp(WizardController);

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
  },
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
