import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

import lib from '../../../lib';

const Seed = seedFactory();

const wizardState = new Seed();
const controller = new lib.WizardController('untitled');
const firstPanel = controller.addPanel('First Panel').panels[0];
firstPanel.addField('firstField', 'text');
wizardState.addObjectAndSetEffect('wizardController', controller);
wizardState.addArrayPropAndSetEffects('panels', [firstPanel]);
wizardState.addArrayPropAndSetEffects('wizardMessages', []);
wizardState.addStringAndSetEffect('wizardComponentName', 'NewWizard');
wizardState.addStringAndSetEffect('title', 'New Wizard');
wizardState.addStringAndSetEffect('wizardFileName', 'NewWizard');
wizardState.addIntAndSetEffect('editingFieldID', 0);
wizardState.addStateSideEffect(({ refreshWizard }, { wizardController, title, wizardFileName }) => {
  wizardController.title = title;
  wizardController.fileName = wizardFileName;
  refreshWizard();
});

wizardState.addBoolPropAndEffects('wizardSaved', false);
wizardState.addSideEffect('dismissWizardMessages', ({ pushToWizardMessages }) => {
  console.log('dismissing');
  pushToWizardMessages('');
});
wizardState.addStateSideEffect('refreshWizard', ({ setWizardController, setPanels }, { wizardController }) => {
  setWizardController(wizardController);
  setPanels(wizardController.panels);
});

wizardState.addStateSideEffect('addPanel', ({ setPanels }, { wizardController }, order) => {
  wizardController.addPanelAt(order, `New Panel ${order}`);
  setPanels(wizardController.panels);
});

wizardState.addStateSideEffect('saveWizard', (
  { wizardSavedOn, pushToWizardMessages },
  { wizardController },
) => {
  lib.axios.post(`${lib.ADMIN_API_URL}/api/wizard-maker`, wizardController.toJSON());
  wizardSavedOn();
  pushToWizardMessages({ text: 'Wizard Saved', action: '' });
});
export default provideState(wizardState.toHash());
