// import li from 'lorem-ipsum';
import { injectState } from 'freactal';
import { Component } from 'react';
import ContentView from './Content.view.jsx';
import contentState from './Content.state';

export default contentState(injectState(class Content extends Component {
  render() {
    return (
      <ContentView />
    );
  }
}));
