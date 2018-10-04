import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import WizardView from './Wizard.view.jsx';
import wizardState from './Wizard.state';

export default withRouter(wizardState(injectState(class Wizard extends Component {
  render() {
    return (
      <WizardView />
    );
  }
})));
