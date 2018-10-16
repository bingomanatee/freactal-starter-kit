import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelTwoState = new Seed();
panelTwoState.addStringAndSetEffect('beta', '', {
  onSet: (effects, state) => {
    const { setPanel } = effects;
    const { panel, beta } = state;
    panel.fields[0].value = beta;
  },
});
panelTwoState.addIntAndSetEffect('gamma', '', {
  onSet: (effects, state) => {
    eval('debugger');
    const { setPanel } = effects;
    const { panel, gamma } = state;
    panel.fields[1].value = gamma;
  },
});
panelTwoState.addObjectAndSetEffect('panel', {});

export default provideState(panelTwoState.toHash());
