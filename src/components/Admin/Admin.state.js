import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const adminState = new Seed();
adminState.addArrayPropAndSetEffects('adminPages', []);

export default provideState(adminState.toHash());
