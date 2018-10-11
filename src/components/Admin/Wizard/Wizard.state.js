import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import _ from 'lodash';

import lib from '../../../lib';

const Seed = seedFactory();

const wizardState = new Seed();

wizardState.addObjectAndSetEffect('wizardController', null, {
  onSet: (effects, state) => {
    if (state.wizardController) {
      state.wizardController.removeListener('panel changed');
      effects.setWizardTitle(state.wizardController.title);
      effects.setWizardFileName(state.wizardController.fileName);
      state.wizardController.on('panel changed', () => {
        effects.updateWizardPanels();
      });
      return effects.updateWizardPanels();
    }
    return state;
  },
});

wizardState.addArrayPropAndSetEffects('wizardPanels', []);
wizardState.addArrayPropAndSetEffects('wizardErrors', []);

wizardState.addStateSideEffect('saveWizardChanges', ({ isEditingWizardOff, updateWizardController }, {
  wizardTitle, wizardFileName, wizardController,
}) => {
  wizardController.title = wizardTitle;
  wizardController.fileName = wizardFileName;
  return updateWizardController(wizardController)
    .then(isEditingWizardOff);
});

wizardState.addStateSideEffect('cancelWizardChanges', ({ isEditingWizardOff, setWizardTitle, setWizardFileName }, {
  wizardController,
}) => setWizardTitle(wizardController.title)
  .then(() => setWizardFileName(wizardController.fileName))
  .then(isEditingWizardOff));

wizardState.addStateSideEffect('updateWizardPanels', (
  { setWizardPanels, setWizardErrors },
  { wizardController },
) => setWizardPanels(wizardController ? wizardController.panels.slice(0) : [])
  .then(() => setWizardErrors(wizardController ? wizardController.errors : [])));

wizardState.addArrayPropAndSetEffects('wizardMessages', []);
wizardState.addStringAndSetEffect('wizardTitle', 'New Wizard');
wizardState.addStringAndSetEffect('wizardTitleErrors', '');
wizardState.addStringAndSetEffect('wizardFileName', 'components/NewWizard');
wizardState.addIntAndSetEffect('editingFieldID', 0);

wizardState.addBoolPropAndEffects('isEditingWizard', false);
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

console.log('------------------- initial state:', wizardState.toHash().initialState());
export default provideState(wizardState.toHash());
