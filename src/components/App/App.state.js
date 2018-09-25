import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import lib from '../../lib';

/**
 * This is the topmost state; its values will be kept in local storage.
 */
const Seed = seedFactory();

const appState = new Seed();
appState.useLocalStorage(true);

appState.addObjectAndSetEffect('routerLocation', {});
lib.addAuth0ToStateDef(appState);

export default provideState(appState.toHash());
