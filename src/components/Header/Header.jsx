import { injectState } from 'freactal';
import { Component } from 'react';
import headerState from './Header.state';
import HeaderView from './Header.view.jsx';
import lib from './../../lib';

export default headerState(injectState(class Header extends Component {
  componentDidMount() {
    const { state, effects } = this.props;
    if (!state.checkedProfile && lib.isLoggedIn(state) && (!state.profile)) {
      effects.checkedProfileOn()
        .then(() => {
          effects.loadProfile();
        });
    } else if (!state.checkedProfile) {
      effects.checkedProfileOn();
    }
  }

  render() {
    return (
      <HeaderView />
    );
  }
}));
