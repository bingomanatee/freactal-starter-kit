import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';

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
});

panelFieldEditorState.addStateSideEffect('saveFieldEdit', (effects, state, field) => {
  field.name = state.panelFieldName;
  field.type = state.panelFieldType;
  effects.setEditingFieldID(0);
  effects.refreshWizard();
});

export default provideState(panelFieldEditorState.toHash());
