import { withRouter } from 'react-router-dom';
import { injectState } from 'freactal';
import { Component } from 'react';
import AppView from './App.view.jsx';


// eslint-disable-next-line react/prefer-stateless-function
export default injectState(withRouter(class App extends Component {
  componentDidMount() {
    this.props.effects.setRouterLocation(this.props.location);
    this.unlisten = this.props.history.listen((location) => {
      console.log('setting location to ', location);
      return this.props.setRouterLocation(location);
    });
    this.listenTime = setInterval(() => {
      if (window.location.pathname !== this.props.state.routerLocation.pathname) {
        console.log('--- location changed---', window.location.pathname, this.props.state.routerLocation.pathname);
        const locationData = Object.assign({}, window.location);
        this.props.effects.setRouterLocation(locationData);
      }
    }, 500);
  }

  componentDidUpdate() {
    this.props.effects.setRouterLocation(this.props.location);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    console.log('rendering app');
    return (
      <AppView />
    );
  }
}));
