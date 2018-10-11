import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import _ from 'lodash';

import lib from '../../../lib';

const Seed = seedFactory();

const wizardState = new Seed();

wizardState.addObjectAndSetEffect('wizardController', null, {
  onSet: (effects, state) => {
    if (state.wizardController) {
      state.wizardController.removeAllListeners('panel changed');
      state.wizardController.on('panel changed', () => {
        effects.updateWizardPanels();
      });
      return effects.updateWizardPanels();
    }
    return state;
  },
});
wizardState.addArrayPropAndSetEffects('wizardPanels', []);

wizardState.addStateSideEffect('updateWizardPanels', ({ setWizardPanels }, { wizardController }) => {
  setWizardPanels(wizardController ? wizardController.panels.slice(0) : []);
});

wizardState.addStateSideEffect('setWizardTitle', ({
  setWizardController,
}, { wizardController }, title) => {
  if (!wizardController) return;
  wizardController.title = title;
  console.log('setting title of ', wizardController, 'to', title);
  setWizardController(wizardController);
});

wizardState.addStateSideEffect('setWizardFileName', ({
  setWizardController,
}, { wizardController }, fileName) => {
  if (!wizardController) return;
  wizardController.fileName = fileName;
  setWizardController(wizardController);
});

wizardState.addArrayPropAndSetEffects('wizardMessages', []);
wizardState.addStringAndSetEffect('wizardComponentName', 'NewWizard');
wizardState.addIntAndSetEffect('editingFieldID', 0);

wizardState.addBoolPropAndEffects('wizardSaved', false);
wizardState.addSideEffect('dismissWizardMessages', ({ unshiftToWizardMessages }) => {
  unshiftToWizardMessages(null);
});

wizardState.addSideEffect('newWizard', ({ setWizardController }) => {
  const wizardController = new lib.WizardController('untitled');
  setWizardController(wizardController);
});

wizardState.addStateSideEffect('addPanel', (
  { setWizardController },
  { wizardController }, order,
) => {
  if (_.isUndefined(order)) order = wizardController.panels.length;
  wizardController.addPanelAt(order, `New Panel ${order || wizardController.panels.length}`);
  console.log('added panel to ', wizardController);
  setWizardController(wizardController);
});

wizardState.addStateSideEffect('saveWizard', (
  { wizardSavedOn, unshiftToWizardMessages },
  { wizardController },
) => {
  lib.axios.post(
    `${lib.ADMIN_API_URL}/api/wizard-maker`,
    wizardController.toJSON(),
  );
  wizardSavedOn();
  unshiftToWizardMessages({ text: 'Wizard Saved', action: '' });
});
export default provideState(wizardState.toHash());
