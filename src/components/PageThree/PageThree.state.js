import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const pageThreeState = new Seed();
pageThreeState.addIntAndSetEffect('pageThreeCount', 1);
pageThreeState.addEffect('incPageThreeCount', update(state => ({
  pageThreeCount: (state.pageThreeCount + 1),
})));

export default provideState(pageThreeState.toHash());
