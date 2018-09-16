import { Component } from 'react';
import AppView from './App.view.jsx';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <AppView />
    );
  }
}

/**
 This is actually a pedantic use of a Component that currently serves no purpose.
 If you don't expand its functionality, this is a simpler passthrough:

 export default AppView

 */
