import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PageThreeView from './PageThree.view.jsx';
import pageThreeState from './PageThree.state';

export default withRouter(pageThreeState(injectState(class PageThree extends Component {
  render() {
    return (
      <PageThreeView />
    );
  }
})));
