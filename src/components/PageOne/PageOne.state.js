import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const pageOneState = new Seed();
pageOneState.addIntAndSetEffect('pageOneCount', 1);
pageOneState.addEffect('incPageOneCount', update(state => ({
  pageOneCount: (state.pageOneCount + 1),
})));

export default provideState(pageOneState.toHash());
