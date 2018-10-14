import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ComponentNameView from './ComponentName.view.jsx';
import componentNameState from './ComponentName.state';
import lib from './../../src/lib';


export default withRouter(componentNameState(injectState(class ComponentName extends Component {
  constructor(props) {
    super(props);
    const controller = new lib.WizardController({ title: 'ComponentTitle' });
    props.effects.setComponentNameWizardController(controller);
  }

  render() {
    return (
      <ComponentNameView />
    );
  }
})));
