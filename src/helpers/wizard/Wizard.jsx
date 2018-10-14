import React, { Component } from 'react';
import _ from 'lodash';
import lib from './../../lib';
import Switch, { Case } from '../logical/Switch';
import WizardPanel from './Panel.js';

export default class Wizard extends Component {
  constructor(props) {
    super(props);
    const { title, footer, controller } = props;
    const wizard = controller || new lib.WizardController({ title, index: 0 });
    const children = _.compact(React.Children.toArray(props.children));
    children.forEach((child) => {
      if (!(React.isValidElement(child) && child.props)) return;
      console.log('making panel from ', child);
      let {
        title: panelTitle, fileDef: panelFileDef, config = {}, children: panelChildren,
      } = child.props;
      if (typeof config === 'string') {
        try {
          config = JSON.parse(config);
        } catch (err) {
          console.log('error parsing config: ', config, err);
          config = {};
        }
      }

      config.title = panelTitle;
      config.children = React.Children.toArray(panelChildren);
      config.fileDef = panelFileDef || 'noFileDef';

      wizard.addPanel(config);
    });
    this.footerClass = footer;
    this.state = {
      wizard,
      index: 0,
    };
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
    if (!this.state.wizard) return '';
    const panels = this.state.wizard.panels;
    console.log('panels: ', panels);
    return (
      <div className={this.mainClass}>
        <h2 className={`${this.mainClass}__title`}>{this.state.wizard.title},
          index: {this.state.wizard.index}
        </h2>
        <div className={`${this.mainClass}__panels`}>
          <Switch index={this.state.wizard.index}>
            {
              panels.map((panel, i) => (
                <Case key={`case-${i}`}>
                  <p> panel {i}</p>
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
