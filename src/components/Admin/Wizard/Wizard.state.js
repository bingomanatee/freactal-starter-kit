import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import _ from 'lodash';

import lib from '../../../lib';

const Seed = seedFactory();

const wizardState = new Seed();

wizardState.addObjectAndSetEffect('wizardController', null, {
  onSet: (effects, state) => {
    if (state.wizardController) {
      if (!(state.wizardController instanceof lib.WizardController)) {
        console.log('bad wizardController', state.wizardController);
      }
      state.wizardController.removeListener('panel changed');
      effects.setWizardTitle(state.wizardController.title);
      effects.setWizardFileName(state.wizardController.fileName);
      effects.saveWizardToLS();
      state.wizardController.on('panel changed', () => {
        console.log('updating wizard panels from events');
        effects.updateWizardPanels();
      });
      effects.updateWizardPanels();
    }
  },
});

wizardState.addArrayPropAndSetEffects('wizardPanels', []);
wizardState.addArrayPropAndSetEffects('wizardErrors', []);

wizardState.addStateSideEffect('saveWizardChanges', ({ isEditingWizardOff, saveWizardController }, {
  wizardTitle, wizardFileName, wizardController,
}) => {
  wizardController.title = wizardTitle;
  wizardController.fileName = wizardFileName;
  return saveWizardController(wizardController)
    .then(isEditingWizardOff);
});

wizardState.addStateSideEffect('cancelWizardChanges', ({ isEditingWizardOff, setWizardTitle, setWizardFileName }, {
  wizardController,
}) => setWizardTitle(wizardController.title)
  .then(() => setWizardFileName(wizardController.fileName))
  .then(isEditingWizardOff));

wizardState.addStateSideEffect('updateWizardPanels', (
  { setWizardPanels, setWizardErrors, saveWizardToLS },
  { wizardController },
) => setWizardPanels(wizardController ? wizardController.panels.slice(0) : [])
  .then(() => setWizardErrors(wizardController ? wizardController.errors : []))
  .then(saveWizardToLS));

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

wizardState.addSideEffect('newWizardController', ({ setWizardController }) => {
  const controller = new lib.WizardController({ title: 'New Wizard', fileName: 'controllers/NewWizard' });
  controller.addPanel({ title: 'First Panel', fileName: 'PanelOne' }, controller);
  setWizardController(controller);
});

wizardState.addSideEffect('loadWizardControllerFromLS', ({ setWizardController, newWizardController }) => {
  if (!lib.isStorageAvailable('localStorage')) {
    return;
  }

  const wizardJSON = lib.localStorage.getItem(lib.WIZARD_CONTROLLER_LS_ID);
  if (!wizardJSON) {
    newWizardController();
    return;
  }
  let wizardObj;
  try {
    wizardObj = JSON.parse(wizardJSON);
  } catch (err) {
    console.log('cannot parse LS JSON: ', wizardJSON, err.message);
    newWizardController();
    return;
  }
  const controller = lib.WizardController.fromJSON(wizardObj);
  console.log('loading controller from LS:', wizardJSON, controller);
  setWizardController(controller);
});

wizardState.addStateSideEffect('saveWizardToLS', (effects, { wizardController }) => {
  if (wizardController && lib.isStorageAvailable('localStorage')) {
    let text;
    try {
      text = JSON.stringify(wizardController.toJSON());
    } catch (err) {
      console.log('error stringing WC', err.message, wizardController);
      return;
    }
    console.log('saving wizard to LS:', text);
    lib.localStorage.setItem(lib.WIZARD_CONTROLLER_LS_ID, text);
  }
});


wizardState.addStateSideEffect('addPanel', (
  effects,
  { wizardController }, order,
) => {
  if (_.isUndefined(order)) {
    order = wizardController.panels.length;
  }
  wizardController.addPanelAt(order, {
    title: `New Panel ${order}`,
    fileName: `NewPanel${order}`,
  });
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
