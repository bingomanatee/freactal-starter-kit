import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import _ from "lodash";

const Seed = seedFactory();

const panelFieldEditorState = new Seed();
panelFieldEditorState.addStringAndSetEffect('panelFieldName', '');
panelFieldEditorState.addStringAndSetEffect('panelFieldType', '');
panelFieldEditorState.addObjectAndSetEffect('panelField', '');

panelFieldEditorState.addSideEffect('editPanelField', (effects, field) => {
  effects.setEditingFieldID(field.id);
  effects.setPanelFieldName(field.name);
  effects.setPanelFieldType(field.type);
});

panelFieldEditorState.addSideEffect('cancelFieldEdit', (effects, field) => {
  effects.setEditingFieldID(0);
  effects.setPanelFieldName(field.name);
  effects.setPanelFieldType(field.type);
  effects.setEditingFieldID(0);
});

panelFieldEditorState.addStateSideEffect('saveFieldEdit', (effects, state, field) => {
  field.name = _.trim(state.panelFieldName);
  field.type = _.trim(state.panelFieldType);
  effects.setEditingFieldID(0);
  effects.refreshFields();
  effects.updateWizardPanels();
});
panelFieldEditorState.addStateSideEffect('deletePanelField', (effects, state, field) => {
  effects.setEditingFieldID(0);
  field.delete();
  effects.saveWizardToLS();
  effects.setEditingFieldID(0);
  effects.refreshFields();
});

export default provideState(panelFieldEditorState.toHash());
