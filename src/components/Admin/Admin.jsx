import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AdminView from './Admin.view.jsx';
import adminState from './Admin.state';

export default withRouter(adminState(injectState(class Admin extends Component {
  render() {
    return (
      <AdminView />
    );
  }
})));
