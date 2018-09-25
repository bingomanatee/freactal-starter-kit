import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const callbackState = new Seed();
callbackState.addIntAndSetEffect('callbackCount', 1);
callbackState.addEffect('incCallbackCount', update(state => ({
  callbackCount: (state.callbackCount + 1),
})));

export default provideState(callbackState.toHash());
