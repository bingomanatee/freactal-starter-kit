import { easyPropper } from 'class-propper';
import EventEmitter from 'eventemitter3';

class WCPField extends EventEmitter {
  constructor(panel, name, type) {
    super();
    WCPField.nextId += 1;
    this.id = WCPField.nextId;
    this.panel = panel;
    this.name = name;
    this.type = type;
  }
  get order() {
    if (this.panel) {
      for (let i = 0; i < this.panel.fields.length; ++i) {
        if (this === this.panel.fields[i]) {
          return i;
        }
      }
    }
    return -1;
  }

  toJSON() {
    return {
      id: this.id,
      order: this.order,
      name: this.name,
      type: this.type,
    };
  }

  delete() {
    this.emit('changed', { deleted: this.toJSON() });
    this.removeAllListeners();
    this.panel.fields = this.panel.fields.filter(f => f !== this);
  }
}

WCPField.fromJSON = ({ name, type = 'text' }, panel) => new WCPField(panel, name, type);

const wPropper = easyPropper(WCPField);
wPropper
  .addInteger('id', {
  })
  .addObject('panel')
  .addString('name', {
    required: true,
    onChange(...args) { this.emit('changed', { what: args }); },
  })
  .addString('type', {
    required: true,
    default: 'text',
    onChange(...args) { this.emit('changed', { what: args }); },
  });

WCPField.nextId = 0;

export default WCPField;
