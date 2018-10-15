import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ComponentNameView from './ComponentName.view.jsx';
import componentNameState from './ComponentName.state';
import lib from 'SOURCE_ROOT../lib';

export default withRouter(componentNameState(injectState(class NewWizard extends Component {
  constructor(props) {
    super(props);
    const controller = new lib.WizardController({ title: 'New Wizard' });
    props.effects.setComponentNameWizardController(controller);
    controller.on('index changed',this.props.setComponentNameIndex)
    this.state = { controller, index: controller.index };
  }

  render() {
    return (
      <ComponentNameView controller={this.props.state.controller} index={this.props.state.index} />
    );
  }
})));
