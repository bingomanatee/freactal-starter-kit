import { injectState } from 'freactal';
import { Component } from 'react';
import PageOneView from './PageOne.view.jsx';
import pageOneState from './PageOne.state';

export default pageOneState(injectState(class PageOne extends Component {
  render() {
    return (
      <PageOneView />
    );
  }
}));
