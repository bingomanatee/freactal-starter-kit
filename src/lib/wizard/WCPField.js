import { easyPropper } from 'class-propper';

export default (bottle) => {
  bottle.factory('WCPField', () => {
    class WCPField {
      constructor(config, panel) {
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
      })
      .addString('type', {
        required: true,
        default: 'text',
      })
      .addProp('value', {default: ''});

    WCPField.nextId = 0;

    return WCPField;
  });
};
