import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

function anonUser() {
  return { name: 'anonymous', id: 0 };
}
const mySeed = new Seed();
mySeed.addStateString('appTitle', 'Freactal Starter Kit');
mySeed.addObjectAndSetEffect('user', anonUser());
mySeed.addObjectAndSetEffect('routerLocation', {});
mySeed.addEffect('logout', update(state => ({ user: anonUser() })));

const state = mySeed.toHash();
export default provideState(state);
