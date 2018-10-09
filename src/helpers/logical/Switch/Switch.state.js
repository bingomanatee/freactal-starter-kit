import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const switchState = new Seed();
switchState.addIntAndSetEffect('switchCount', 1);
switchState.addEffect('incSwitchCount', update(state => ({
  switchCount: (state.switchCount + 1),
})));

export default provideState(switchState.toHash());
