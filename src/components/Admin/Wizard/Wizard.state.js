import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

import lib from '../../../lib';

const Seed = seedFactory();

const wizardState = new Seed();
const controller = new lib.WizardController('untitled');
const firstPanel = controller.addPanel('First Panel').panels[0];
wizardState.addStateObject('wizardController', controller);
wizardState.addArrayPropAndSetEffects('panels', [firstPanel]);
wizardState.addStringAndSetEffect('title', '(Untitled)');
wizardState.addStateSideEffect('addPanel', ({ setPanels }, { wizardController }, order) => {
  wizardController.addPanelAt(order, `New Panel ${order}`);
  setPanels(wizardController.panels);
});
export default provideState(wizardState.toHash());
