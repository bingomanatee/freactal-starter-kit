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
wizardState.addStateString('title', 'New Wizard');
wizardState.addStateString('wizardFileName', 'NewWizard');
wizardState.addEffect('setWizardFileName', (effects, wizardFileName) => (state) => {
  const { wizardController } = state;
  wizardController.fileName = wizardFileName;
  return Object.assign({}, state, { wizardFileName, wizardController });
});
wizardState.addEffect('setTitle', (effects, title) => (state) => {
  const { wizardController } = state;
  wizardController.title = title;
  return Object.assign({}, state, { title, wizardController });
});
wizardState.addIntAndSetEffect('editingFieldID', 0);

wizardState.addBoolPropAndEffects('wizardSaved', false);
wizardState.addSideEffect('dismissWizardMessages', ({ unshiftToWizardMessages }) => {
  unshiftToWizardMessages(null);
});
wizardState.addStateSideEffect('refreshWizard', ({ setWizardController, setPanels }, { wizardController }) => {
  setWizardController(wizardController);
  setPanels(wizardController.panels.slice(0));
});

wizardState.addStateSideEffect('addPanel', ({ setPanels }, { wizardController }, order) => {
  wizardController.addPanelAt(order, `New Panel ${order}`);
  setPanels(wizardController.panels);
});

wizardState.addStateSideEffect('saveWizard', (
  { wizardSavedOn, unshiftToWizardMessages },
  { wizardController },
) => {
  lib.axios.post(`${lib.ADMIN_API_URL}/api/wizard-maker`, wizardController.toJSON());
  wizardSavedOn();
  unshiftToWizardMessages({ text: 'Wizard Saved', action: '' });
});
export default provideState(wizardState.toHash());
