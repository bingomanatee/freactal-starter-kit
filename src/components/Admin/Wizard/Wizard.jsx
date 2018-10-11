import { injectState } from 'freactal';
import { Component } from 'react';

import WizardView from './Wizard.view.jsx';
import wizardState from './Wizard.state';
import lib from '../../../lib';

export default wizardState(injectState(class Wizard extends Component {
  constructor(props) {
    super(props);
    const {
      effects: { setWizardController },
      state: { wizardController },
    } = props;
    console.log('old wizard controller', wizardController);
    if (!wizardController) {
      const controller = new lib.WizardController('New Wizard', { fileName: 'controllers/NewWizard' });
      controller.addPanel('First Panel', { fileName: 'PanelOne' });
      setWizardController(controller);
    }
  }

  render() {
    return (
      <WizardView />
    );
  }
}));
