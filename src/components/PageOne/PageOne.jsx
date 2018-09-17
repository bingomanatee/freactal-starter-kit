import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PageOneView from './PageOne.view.jsx';
import pageOneState from './PageOne.state';

export default withRouter(pageOneState(injectState(class PageOne extends Component {
  render() {
    return (
      <PageOneView />
    );
  }
})));
