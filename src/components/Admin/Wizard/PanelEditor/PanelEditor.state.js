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
panelEditorState.addSideEffect(
  'addPanelField',
  (
    {
      refreshWizard,
      setPanelFields,
    },
    panel,
  ) => {
    panel.addField('untitled', 'text', '');
    setPanelFields(panel.fields.slice(0));
    refreshWizard();
  },
);
panelEditorState.addSideEffect(
  'movePanelUp',
  (
    { refreshWizard },
    panel,
  ) => {
    panel.move('up');
    refreshWizard();
  },
);
panelEditorState.addSideEffect(
  'movePanelDown',
  (
    { refreshWizard },
    panel,
  ) => {
    panel.move('down');
    refreshWizard();
  },
); panelEditorState.addSideEffect(
  'deletePanel',
  (
    { refreshWizard },
    panel,
  ) => {
    panel.delete();
    refreshWizard();
  },
);

export default provideState(panelEditorState.toHash());
