import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Panel2View from './Panel2.view.jsx';
import panel2State from './Panel2.state';

export default withRouter(panel2State(injectState(class Panel2 extends Component {
  render() {
    return (
      <Panel2View />
    );
  }
})));
