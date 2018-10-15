import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PanelTwoView from './PanelTwo.view.jsx';
import panelTwoState from './PanelTwo.state';

export default withRouter(panelTwoState(injectState(class PanelTwo extends Component {
  render() {
    return (
      <PanelTwoView />
    );
  }
})));