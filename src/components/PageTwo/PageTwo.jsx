import { injectState } from 'freactal';
import { Component } from 'react';
import PageTwoView from './PageTwo.view.jsx';
import pageTwoState from './PageTwo.state';

export default pageTwoState(injectState(class PageTwo extends Component {
  render() {
    return (
      <PageTwoView />
    );
  }
}));
