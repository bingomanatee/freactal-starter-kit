import { Component } from 'react';
import { injectState } from 'freactal';
import CallbackView from './Callback.view';

export default injectState(class CallbackComponent extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.props.effects.handleAuthentication()
        .then(() => {
          this.props.history.replace(this.props.state.loginLocation || '/');
        });
    }
  }

  render() {
    return (
      <CallbackView />
    );
  }
});
