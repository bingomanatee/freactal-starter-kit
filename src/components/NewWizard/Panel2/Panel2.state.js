import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panel2State = new Seed();
panel2State.addIntAndSetEffect('panel2Count', 1);
panel2State.addEffect('incPanel2Count', update(state => ({
  panel2Count: (state.panel2Count + 1),
})));

export default provideState(panel2State.toHash());
