import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const buttonBarState = new Seed();
buttonBarState.addIntAndSetEffect('buttonBarCount', 1);
buttonBarState.addEffect('incButtonBarCount', update(state => ({
  buttonBarCount: (state.buttonBarCount + 1),
})));

export default provideState(buttonBarState.toHash());
