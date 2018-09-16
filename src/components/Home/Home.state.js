import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const homeState = new Seed();
homeState.addIntAndSetEffect('homeCount', 1);
homeState.addEffect('incHomeCount', update(state => ({
  homeCount: (state.homeCount + 1),
})));

export default provideState(homeState.toHash());
