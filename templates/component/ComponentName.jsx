import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ComponentNameView from './ComponentName.view.jsx';
import componentNameState from './ComponentName.state';

export default withRouter(componentNameState(injectState(class ComponentName extends Component {
  render() {
    return (
      <ComponentNameView />
    );
  }
})));
