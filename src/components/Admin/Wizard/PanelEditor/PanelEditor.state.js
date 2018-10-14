import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import _ from 'lodash';

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
  ({ updateWizardPanels, setPanel, editingPanelOff }, { panel, panelTitle, panelFileName }) => {
    panel.title = _.trim(panelTitle);
    panel.fileName = _.trim(panelFileName);
    setPanel(panel);
    editingPanelOff();
    updateWizardPanels();
  },
);
panelEditorState.addStateSideEffect(
  'cancelEditPanel',
  ({ setPanelTitle, setPanelFileName, editingPanelOff }, { panel }) => {
    setPanelTitle(panel.title);
    setPanelFileName(panel.fileName);
    editingPanelOff();
  },
);
panelEditorState.addSideEffect(
  'addPanelField',
  (
    {
      setPanelFields, saveWizardToLS,
    },
    panel,
  ) => {
    panel.addField('untitled', 'text', '');
    setPanelFields(panel.fields.slice(0));
    saveWizardToLS();
  },
);
panelEditorState.addSideEffect(
  'movePanelUp',
  (
    effects,
    panel,
  ) => {
    panel.move('up');
    effects.saveWizardToLS();
  },
);
panelEditorState.addSideEffect(
  'movePanelDown',
  (
    effects,
    panel,
  ) => {
    panel.move('down');
    effects.saveWizardToLS();
  },
); panelEditorState.addSideEffect(
  'deletePanel',
  (
    effects,
    panel,
  ) => {
    panel.delete();
    effects.updateWizardPanels();
  },
);

export default provideState(panelEditorState.toHash());
