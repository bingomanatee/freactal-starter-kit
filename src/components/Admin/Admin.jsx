import { injectState } from 'freactal';
import { Component } from 'react';

import AdminView from './Admin.view.jsx';
import adminState from './Admin.state';
import lib from '../../lib';

export default adminState(injectState(class Admin extends Component {
  componentDidMount() {
    lib.pageProvider.forParent('admin home')
      .then(pages => this.props.effects.setAdminPages(pages.pages));
  }

  render() {
    return (
      <AdminView pages={this.props.state.adminPages} />
    );
  }
}));
