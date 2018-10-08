import { injectState } from 'freactal';
import { Component } from 'react';

import WizardView from './Wizard.view.jsx';
import wizardState from './Wizard.state';

export default wizardState(injectState(class Wizard extends Component {
  constructor(props) {
    super(props);
    const { effects, state } = props;
    effects.setTitle('New Wizard');
    effects.setWizardFileName('components/NewWizard');
  }

  render() {
    return (
      <WizardView />
    );
  }
}));
