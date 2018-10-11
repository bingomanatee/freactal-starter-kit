import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

const Seed = seedFactory();

const panelEditorState = new Seed();

panelEditorState.addBoolPropAndEffects('editingPanel', false);
panelEditorState.addStringAndSetEffect('panelTitle', '');
panelEditorState.addStringAndSetEffect('panelFileName', '');
panelEditorState.addArrayPropAndSetEffects('panelFields', []);
panelEditorState.addObjectAndSetEffect('panel', {});
panelEditorState.addStateSideEffect('refreshFields', ({ setPanelFields }, { panel }) => {
  setPanelFields(panel.fields);
});

panelEditorState.addStateSideEffect(
  'saveEditPanel',
  ({ setPanel, editingPanelOff }, { panel, panelTitle, panelFileName }) => {
    panel.title = panelTitle;
    panel.fileName = panelFileName;
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
panelEditorState.addSideEffect(
  'addPanelField',
  (
    {
      setPanelFields,
    },
    panel,
  ) => {
    panel.addField('untitled', 'text', '');
    setPanelFields(panel.fields.slice(0));
  },
);
panelEditorState.addSideEffect(
  'movePanelUp',
  (
    effects,
    panel,
  ) => {
    panel.move('up');
  },
);
panelEditorState.addSideEffect(
  'movePanelDown',
  (
    { },
    panel,
  ) => {
    panel.move('down');
  },
); panelEditorState.addSideEffect(
  'deletePanel',
  (
    effects,
    panel,
  ) => {
    panel.delete();
  },
);

export default provideState(panelEditorState.toHash());
