import { provideState } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const headerState = new Seed();
headerState.addBoolPropAndEffects('checkedProfile', false);
const hash = headerState.toHash();
console.log('headerState: ', hash);

export default provideState(hash);
