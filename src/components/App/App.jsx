import { injectState } from 'freactal';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AppView from './App.view.jsx';
import appState from './App.state';

export default withRouter(appState(injectState(class App extends Component {
  componentDidMount() {
    this.props.effects.setRouterLocation(this.props.location);
    this.unlisten = this.props.history.listen(location => this.props.effects.setRouterLocation(location));

    // there are circumstances where the location lags - this is a failsafe.
    this._locInterval = setInterval(() => {
      if ((!this.props.state.routerLocation) ||
        (window.location.pathname !== this.props.state.routerLocation.pathname)) {
        const locationData = Object.assign({}, window.location);
        this.props.effects.setRouterLocation(locationData);
      }
    }, 2000);
    this.props.effects.resetPageState()
      .then(() => {
        this.props.effects.loadPages();
      });
  }

  componentDidUpdate() {
    this.props.effects.setRouterLocation(this.props.location);
  }

  componentWillUnmount() {
    this.unlisten();
    if (this._locInterval) clearInterval(this._locInterval);
  }

  render() {
    return (
      <AppView />
    );
  }
})));
