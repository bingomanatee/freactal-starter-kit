import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const componentNameState = new Seed();

componentNameState.addObjectAndSetEffect('componentNameWizardController');

export default provideState(componentNameState.toHash());
