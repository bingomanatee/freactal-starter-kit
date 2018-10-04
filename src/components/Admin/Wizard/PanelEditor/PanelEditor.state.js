import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelEditorState = new Seed();
panelEditorState.addIntAndSetEffect('panelEditorCount', 1);
panelEditorState.addEffect('incPanelEditorCount', update(state => ({
  panelEditorCount: (state.panelEditorCount + 1),
})));

export default provideState(panelEditorState.toHash());
