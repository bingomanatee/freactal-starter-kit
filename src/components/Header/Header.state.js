import { provideState } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const headerState = new Seed();

export default provideState(headerState.toHash());
