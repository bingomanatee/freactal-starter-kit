import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelTwoState = new Seed();
panelTwoState.addStringAndSetEffect('beta');
panelTwoState.addIntAndSetEffect('Gamma');

export default provideState(panelTwoState.toHash());
