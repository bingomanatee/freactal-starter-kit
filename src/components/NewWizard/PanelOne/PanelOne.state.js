import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelOneState = new Seed();
panelOneState.addObjectAndSetEffect('alpha');
panelOneState.addStringAndSetEffect('beta');

export default provideState(panelOneState.toHash());
