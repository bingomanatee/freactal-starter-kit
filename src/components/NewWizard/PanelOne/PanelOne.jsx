import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PanelOneView from './PanelOne.view.jsx';
import panelOneState from './PanelOne.state';

export default withRouter(panelOneState(injectState(class PanelOne extends Component {
  render() {
    return (
      <PanelOneView />
    );
  }
})));
