import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PageTwoView from './PageTwo.view.jsx';
import pageTwoState from './PageTwo.state';

export default withRouter(pageTwoState(injectState(class PageTwo extends Component {
  render() {
    return (
      <PageTwoView />
    );
  }
})));
