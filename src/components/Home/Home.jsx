// import { injectState } from 'freactal';
// import { Component } from 'react';
import HomeView from './Home.view.jsx';
// import homeState from './Home.state';

export default HomeView;

/**
 * if you need the functionality of a Component at this level use this instead:
 *
  export default homeState(injectState(class Home extends Component {
  render() {
    return (
      <HomeView />
    );
  }
}));

 *
 */
