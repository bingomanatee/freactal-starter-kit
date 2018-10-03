import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const adminState = new Seed();
adminState.addIntAndSetEffect('adminCount', 1);
adminState.addEffect('incAdminCount', update(state => ({
  adminCount: (state.adminCount + 1),
})));

export default provideState(adminState.toHash());
