import { Component } from 'react';
import _ from 'lodash';
import lib from './../../lib';
import Switch, { Case } from '../logical/Switch';
import WizardPanel from './Panel.js';

function getChildren(props) {
  let children = props.children || [];
  if (!Array.isArray(children)) {
    children = [children];
  }
  return children;
}

export default class Wizard extends Component {
  constructor(props) {
    super(props);
    const { title, footer, controller } = props;
    const wizard = controller || new lib.WizardController(title);
    const children = getChildren(props);
    children.forEach((child) => {
      const { title: cTitle, config = {}, children: cChildren } = child.props;
      wizard.addPanel(cTitle, config, cChildren);
    });
    this.footerClass = footer;
    this.state = {
      wizard,
      index: 0,
    };
    wizard.on('index changed', ({ index }) => {
      this.setState({ index });
    });
  }

  get mainClass() {
    return _.get(this.state, 'wizard.mainClass', 'wizard');
  }

  get footer() {
    const FooterClass = this.footerClass;
    if (!FooterClass) {
      return '';
    }

    return <FooterClass wizard={this.state.wizard} />;
  }

  render() {
    const panels = this.state.wizard.panels;
    return (
      <div className={this.mainClass}>
        <h2 className={`${this.mainClass}__title`}>{this.state.wizard.title}</h2>
        <div className={`${this.mainClass}__panels`}>
          <Switch subject={this.state.index}>
            {
              panels.map((panel, i) => (
                <Case is={panel.order} key={`case-${i}`}>
                  <WizardPanel panel={panel} />
                </Case>
              ))
            }
          </Switch>
        </div>
        {this.footer}
      </div>
    );
  }
}
