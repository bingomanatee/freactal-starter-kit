import React, { Component } from 'react';
import _ from 'lodash';
import lib from './../../lib';
import Switch, { Case } from '../logical/Switch';
import WizardPanel from './Panel.jsx';

export default class Wizard extends Component {
  constructor(props) {
    super(props);
    const { title, footer, controller } = props;
    const wizard = controller || new lib.WizardController({ title, index: 0 });
    this.footerClass = footer;
    this.state = {
      wizard,
      index: wizard.index,
      children: [],
    };
  }

  get mainClass() {
    return _.get(this.state, 'wizard.mainClass', 'wizard');
  }

  componentDidMount() {
    this.initChildren();
  }

  initChildren() {
    const wizard = this.state.wizard;
    const propChildren = _.compact(React.Children.toArray(this.props.children));
    const children = [];
    propChildren.forEach((child, i) => {
      if (!(React.isValidElement(child) && child.props)) return;
      console.log('making panel from ', child);
      let {
        title: panelTitle, fileName: panelFileName, config = {}, children: panelChildren,
      } = child.props;
      if (typeof config === 'string') {
        try {
          config = JSON.parse(config);
        } catch (err) {
          console.log('error parsing config: ', config, err);
          config = {};
        }
      }

      children.push(React.Children.toArray(panelChildren));
      const order = children.length;
      config.title = panelTitle;
      config.fileName = panelFileName;

      if (wizard.panels[i]) {
        if (panelTitle) wizard.panels[i].title = panelTitle;
        if (panelFileName) wizard.panels[i].fileName = panelFileName;
      } else wizard.addPanelAt(order, config);
    });

    this.setState({ wizard, children });
  }

  get footer() {
    const FooterClass = this.footerClass;
    if (!FooterClass) {
      return '';
    }

    return <FooterClass wizard={this.state.wizard} />;
  }

  get index() {
    if (Object.keys(this.props).includes('index')) {
      return this.props.index;
    } else if (this.state.wizard) { return this.state.wizard.index; }
    return 0;
  }

  render() {
    if (!this.state.wizard) return '';
    const panels = this.state.wizard.panels;

    return (
      <div className={this.mainClass}>
        <h2 className={`${this.mainClass}__title`}>{this.state.wizard.title},
          subject: {(this.index)}
        </h2>
        <div className={`${this.mainClass}__panels`}>
          <Switch subject={parseInt(this.state.wizard.index)}>
            {
              panels.map((panel, i) => (
                <Case key={`case-${i}`} is={i}>
                  <p> panel {i}</p>
                  <WizardPanel panel={panel}>{this.state.children[i]}</WizardPanel>
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
