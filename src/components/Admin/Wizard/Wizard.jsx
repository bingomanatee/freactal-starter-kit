import { injectState } from 'freactal';
import { Component } from 'react';

import WizardView from './Wizard.view.jsx';
import wizardState from './Wizard.state';
import lib from '../../../lib';

export default wizardState(injectState(class Wizard extends Component {
  constructor(props) {
    super(props);
    const {
      effects: {
        loadWizardControllerFromLS, isEditingWizardOff, newWizardController,
      },
      state: { wizardController },
    } = props;
    console.log('old wizard controller', wizardController);
    if (lib.localStorageHas(lib.WIZARD_CONTROLLER_LS_ID)) {
      loadWizardControllerFromLS();
    } else {
      newWizardController();
    }
    isEditingWizardOff();
  }

  render() {
    return (
      <WizardView />
    );
  }
}));
