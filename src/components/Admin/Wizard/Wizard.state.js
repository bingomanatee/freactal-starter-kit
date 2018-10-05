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
wizardState.addStringAndSetEffect('wizardComponentName', 'NewWizard');
wizardState.addStringAndSetEffect('title', '(Untitled)');
wizardState.addIntAndSetEffect('editingFieldID', 0);

wizardState.addStateSideEffect('refreshWizard', ({ setWizardController, setPanels }, { wizardController }, order) => {
  setWizardController(wizardController);
  setPanels(wizardController.panels);
});

wizardState.addStateSideEffect('addPanel', ({ setPanels }, { wizardController }, order) => {
  wizardController.addPanelAt(order, `New Panel ${order}`);
  setPanels(wizardController.panels);
});
export default provideState(wizardState.toHash());
