import { injectState } from 'freactal';
import { Component } from 'react';

import PanelFieldEditorView from './PanelFieldEditor.view.jsx';
import panelFieldEditorState from './PanelFieldEditor.state';

export default panelFieldEditorState(injectState(class PanelFieldEditor extends Component {
  constructor(props) {
    super(props);
    props.effects.setPanelField(props.field);
    props.effects.setPanelFieldName(props.field.name);
    props.effects.setPanelFieldType(props.field.type);
  }
  render() {
    return (
      <PanelFieldEditorView />
    );
  }
}));
