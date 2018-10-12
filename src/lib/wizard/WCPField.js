import { easyPropper } from 'class-propper';
import EventEmitter from 'eventemitter3';

export default (bottle) => {
  bottle.factory('WCPField', () => {
    class WCPField extends EventEmitter {
      constructor(config, panel) {
        super();
        Object.assign(this, config);
        if (panel) this.panel = panel;
        if (this.id) {
          WCPField.nextId = Math.max(WCPField.nextId, this.id + 1);
        } else {
          WCPField.nextId += 1;
          this.id = WCPField.nextId;
        }
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

    WCPField.fromJSON = (config, panel) => new WCPField(config, panel);

    const wPropper = easyPropper(WCPField);
    wPropper
      .addInteger('id', {})
      .addObject('panel')
      .addString('name', {
        required: true,
        onChange(...args) {
          this.emit('changed', { what: args });
        },
      })
      .addString('type', {
        required: true,
        default: 'text',
        onChange(...args) {
          this.emit('changed', { what: args });
        },
      });

    WCPField.nextId = 0;

    return WCPField;
  });
};
