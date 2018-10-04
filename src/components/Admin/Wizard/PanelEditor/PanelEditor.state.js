import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelEditorState = new Seed();

panelEditorState.addBoolPropAndEffects('editingPanel', false);
panelEditorState.addStringAndSetEffect('panelTitle', '');
panelEditorState.addArrayPropAndSetEffects('panelFields', []);
panelEditorState.addObjectAndSetEffect('panel', {});
panelEditorState.addStateSideEffect(
  'saveEditPanel',
  ({ setPanel, editingPanelOff }, { panel, panelTitle }) => {
    panel.title = panelTitle;
    setPanel(panel);
    editingPanelOff();
  },
);
panelEditorState.addStateSideEffect(
  'cancelEditPanel',
  ({ setPanelTitle, editingPanelOff }, { panel }) => {
    setPanelTitle(panel.title);
    editingPanelOff();
  },
);

export default provideState(panelEditorState.toHash());
