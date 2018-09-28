import cp from 'class-propper';
import _ from 'lodash';

import EventEmitter from 'eventemitter3';

/**
 *
 */
class WizardControllerPanel extends EventEmitter {
  constructor(title, config = {}, children) {
    super();
    this.title = title;
    this.children = children;
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

  /**
   * the outer class of the panel can be set as 'mainClass' in configuration
   * or defaults to the shared controller property 'panelClass';
   * @returns {*}
   */
  get panelClass() {
    return this.mainClass || _.get(this, 'controller.panelClass', 'wizardPanel');
  }

  get isFirst() {
    if (!this.controller) return true;
    return this.order === 0;
  }

  get isLast() {
    if (!this.controller) return true;
    return this === _.last(this.controller.panels);
  }

  get classes() {
    const classes = [this.panelClass];
    if (this.isFirst) classes.push(`${this.panelClass}-first`);
    if (this.isLast) classes.push(`${this.panelClass}-last`);
    return classes.join(' ');
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
  })
  .addProp('children', {});

export default WizardControllerPanel;
