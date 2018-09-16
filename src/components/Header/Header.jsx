import HeaderView from './Header.view.jsx';

/**
 * All the functionality for the header is managed by Freactal
 * so there is no need for a higher level component.
 * Should this not be true for you use the following version:

import { injectState } from 'freactal';
import { Component } from 'react';
import headerState from './Header.state';

export default headerState(injectState(class Header extends Component {
  render() {
    return (
      <HeaderView />
    );
  }
}));

 *
 */

export default HeaderView;
