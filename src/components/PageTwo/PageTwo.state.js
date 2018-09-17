import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const pageTwoState = new Seed();
pageTwoState.addIntAndSetEffect('pageTwoCount', 1);
pageTwoState.addEffect('incPageTwoCount', update(state => ({
  pageTwoCount: (state.pageTwoCount + 1),
})));

export default provideState(pageTwoState.toHash());
