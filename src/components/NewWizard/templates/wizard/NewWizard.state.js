import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const newWizardState = new Seed();

newWizardState.addObjectAndSetEffect('newWizardWizardController');
newWizardState.addIntAndSetEffect('newWizardWizardIndex', 0);

export default provideState(newWizardState.toHash());
