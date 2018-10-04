import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PanelEditorView from './PanelEditor.view.jsx';
import panelEditorState from './PanelEditor.state';

export default withRouter(panelEditorState(injectState(class PanelEditor extends Component {
  render() {
    return (
      <PanelEditorView />
    );
  }
})));
