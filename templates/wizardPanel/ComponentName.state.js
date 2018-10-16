import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const componentNameState = new Seed();
componentFields
componentNameState.addObjectAndSetEffect('panel', {});

export default provideState(componentNameState.toHash());
