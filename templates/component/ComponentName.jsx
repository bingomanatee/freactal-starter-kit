import { injectState } from 'freactal';
import { Component } from 'react';
import ComponentNameView from './ComponentName.view.jsx';
import componentNameState from './ComponentName.state';

export default componentNameState(injectState(class ComponentName extends Component {
  render() {
    return (
      <ComponentNameView />
    );
  }
}));
