/* eslint-disable func-names,object-shorthand */
import cp from 'class-propper';
import EventEmitter from 'eventemitter3';
import WizardControllerPanel from './WizardControllerPanel';

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
  .addProp('mainClass', {
    defaultValue: 'wizard',
  });


export default WizardController;
