import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelOneState = new Seed();
panelOneState.addObjectAndSetEffect('alpha','', {
      onSet: (effects, state) => {
        const { setPanel } = effects;
        const { panel, alpha } = state;
        panel.fields[0].value = alpha;
      }
    });
panelOneState.addStringAndSetEffect('beta','', {
      onSet: (effects, state) => {
        const { setPanel } = effects;
        const { panel, beta } = state;
        panel.fields[1].value = beta;
      }
    });
panelOneState.addObjectAndSetEffect('panel', {});

export default provideState(panelOneState.toHash());
