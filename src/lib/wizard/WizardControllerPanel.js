import cp from 'class-propper';
import EventEmitter from 'eventemitter3';

class WizardControllerPanel extends EventEmitter {
  constructor(title, config = {}) {
    super();
    this.title = title;
    Object.assign(this, config);
  }

  get order() {
    if (!this.controller) {
      return -1;
    }

    for (let i = 0; i < this.controller.panels.length; ++i) {
      if (this === this.controller.panels[i]) {
        return i;
      }
    }
    return -1;
  }
}

const propper = cp(WizardControllerPanel);

propper.addString('title', {
  required: true,
})
  .addProp('controller', {
    failsWhen: 'object',
  })
  .addProp('data', {
    failsWhen: 'object',
    defaultValue: () => ({}),
  });

export default WizardControllerPanel;
