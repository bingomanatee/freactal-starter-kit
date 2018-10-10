import cp from 'class-propper';

class WCPField {
  constructor(panel, name, type) {
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
    this.panel.fields = this.panel.fields.filter(f => f !== this);
  }
}

const wPropper = cp(WCPField);
wPropper
  .addProp('panel', {
    required: true,
  })
  .addString('name', {
    required: true,
  })
  .addString('type', {
    required: true,
    default: 'text',
  });

WCPField.nextId = 0;

export default WCPField;
