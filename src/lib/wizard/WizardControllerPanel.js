import cp from 'class-propper';
import _ from 'lodash';
import EventEmitter from 'eventemitter3';
import WCPField from './WCPField';

/**
 * A data model for a panel of a wizard.
 */
class WizardControllerPanel extends EventEmitter {
  constructor(title, config = {}, children = null) {
    super();
    this.title = title;
    this.children = children;
    WizardControllerPanel.nextId += 1;
    this.id = WizardControllerPanel.nextId;
    Object.assign(this, config);
  }

  get order() {
    if (this.controller) {
      for (let i = 0; i < this.controller.panels.length; ++i) {
        if (this === this.controller.panels[i]) {
          return i;
        }
      }
    }
    return -1;
  }

  errors() {
    const out = this.propErrors() || [];
    return out;
  }

  /**
   * the outer class of the panel can be set as 'mainClass' in configuration
   * or defaults to the shared controller property 'panelClass';
   * @returns {*}
   */
  get panelClass() {
    return this.mainClass || _.get(this, 'controller.panelClass', 'wizardPanel');
  }

  get isFirst() {
    if (!this.controller) {
      return true;
    }
    return this.order === 0;
  }

  get isLast() {
    if (!this.controller) {
      return true;
    }
    return this.order === (this.controller.panels.length - 1);
  }

  get isOnly() {
    return this.isFirst && this.isLast;
  }

  get classes() {
    const classes = [this.panelClass];
    if (this.isFirst) {
      classes.push(`${this.panelClass}-first`);
    }
    if (this.isLast) {
      classes.push(`${this.panelClass}-last`);
    }
    return classes.join(' ');
  }

  addField(name, type = 'text', defaultValue = '') {
    let field;
    if (typeof name === 'object') {
      field = Object.assign(name, { panel: this });
    } else {
      field = new WCPField(this, name, type, { defaultValue });
    }
    this._initField(field);
    this.fields.push(field);
    this.emit('changed', { addedField: field.toJSON() });
  }

  _initField(field) {
    field.panel = this;
    field.removeAllListeners('changed');
    field.on('changed', (...args) => {
      this.emit('changed', { field: args });
    });
  }

  move(dir) {
    const order = this.order;
    this.controller.panels = this.controller.panels.filter(a => a !== this);
    switch (dir) {
      case 'up':
        this.controller.panels.splice(order - 1, 0, this);
        break;
      case 'down':
        this.controller.panels.splice(order + 1, 0, this);
        break;

      default:
        throw new Error(`strange direction(${dir})`);
    }
    this.controller.panels = this.controller.panels.filter(a => a);
  }

  delete() {
    this.controller.panels = this.controller.panels.filter(a => a !== this);
  }

  toJSON() {
    return {
      title: this.title,
      fileName: this.fileName,
      fields: this.fields.map(f => f.toJSON()),
    };
  }
}

WizardControllerPanel.fromJSON = (data, controller = null) => {
  const panel = new WizardControllerPanel(data.title, { controller });
  if (data.fields && Array.isArray(data.fields)) {
    data.fields.forEach((field) => {
      panel.addField(WCPField.fromJSON(field));
    });
  }
  return panel;
};

WizardControllerPanel.nextId = 0;

const propper = cp(WizardControllerPanel);
propper.addIsValid();

propper
  .addString('title', {
    required: true,
    onChange(...args) {
      this.emit('changed', { change: args, panel: this });
    },
    // eslint-disable-next-line object-shorthand
    onBadData: function () { return true; },
  })
  .addString('fileName', {
    required: true,
    onChange(...args) {
      this.emit('changed', { change: args, panel: this });
    },
    onBadData: function () { return true; },
  })
  .addProp('controller', {
    type: 'object',
  })
  .addProp('fields', {
    type: 'array',
    defaultValue: () => ([]),
  })
  .addProp('children');

export default WizardControllerPanel;
