import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const contentState = new Seed();
contentState.addIntAndSetEffect('contentCount', 1);
contentState.addEffect('incContentCount', update(state => ({
  contentCount: (state.contentCount + 1),
})));

export default provideState(contentState.toHash());
