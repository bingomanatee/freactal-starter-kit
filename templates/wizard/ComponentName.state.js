import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const componentNameState = new Seed();
componentNameState.addIntAndSetEffect('componentNameCount', 1);
componentNameState.addEffect('incComponentNameCount', update(state => ({
  componentNameCount: (state.componentNameCount + 1),
})));

export default provideState(componentNameState.toHash());
