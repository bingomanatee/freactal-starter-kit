import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const wizardState = new Seed();
wizardState.addIntAndSetEffect('wizardCount', 1);
wizardState.addEffect('incWizardCount', update(state => ({
  wizardCount: (state.wizardCount + 1),
})));

export default provideState(wizardState.toHash());
