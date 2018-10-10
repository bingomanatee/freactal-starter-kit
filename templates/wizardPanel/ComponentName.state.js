import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const componentNameState = new Seed();
componentFields;

export default provideState(componentNameState.toHash());
