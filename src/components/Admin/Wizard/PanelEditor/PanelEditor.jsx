import { injectState } from 'freactal';
import { Component } from 'react';

import PanelEditorView from './PanelEditor.view.jsx';
import panelEditorState from './PanelEditor.state';

export default panelEditorState(injectState(class PanelEditor extends Component {
  constructor(props) {
    super(props);
    const { effects, state, panel } = props;
    if (panel) {
      effects.setPanel(panel);
      effects.setPanelTitle(panel.title);
      effects.setPanelFields(panel.fields);
      if (!panel.fileName) panel.fileName = `Panel${panel.order + 1}`;
      effects.setPanelFileName(panel.fileName);
    }
  }

  render() {
    return (
      <PanelEditorView state={this.props.state} />
    );
  }
}));
