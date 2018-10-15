import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NewWizardView from './NewWizard.view.jsx';
import newWizardState from './NewWizard.state';
import lib from './../../../lib';

export default withRouter(newWizardState(injectState(class NewWizard extends Component {
  constructor(props) {
    super(props);
    const controller = new lib.WizardController({ title: 'New Wizard' });
    props.effects.setNewWizardWizardController(controller);
    controller.on('index changed',this.props.setNewWizardIndex)
    this.state = { controller, index: controller.index };
  }

  render() {
    return (
      <NewWizardView controller={this.props.state.controller} index={this.props.state.index} />
    );
  }
})));
