import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const pageThreeState = new Seed();
pageThreeState.addBoolPropAndEffects('toggle', false);
pageThreeState.addIntAndSetEffect('index', 0);

export default provideState(pageThreeState.toHash());
