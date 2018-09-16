import { injectState } from 'freactal';
import { Toolbar, Button } from 'react-md';


import headerState from './Header.state';
import styles from './Header.module.css';
import lib from '../../lib';

function title(state) {
  let location = '';
  if (state.routerLocation && state.routerLocation.pathname) {
    location = state.routerLocation.pathname.replace(/\/g, ':'/);
  } else {
    console.log('no path for location');
  }
  return lib.SITE_NAME + location;
}

const searching = false;
// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Header}>
    <Toolbar
      id="fixed-toolbar-example"
      fixed
      colored
      nav={(
        <Button
          key="nav"
          icon
        >
          {searching ? 'arrow_back' : 'menu'}
        </Button>
      )}
      actions={(
        <Button
          key="action"
          icon
        >
          {searching ? 'close' : 'search'}
        </Button>
      )}
      title={title(state) + ' ' + JSON.stringify(state.routerLocation)}
      titleId={lib.SITE_NAME.toLowerCase().replace(/[\W]+/g, '-')}
      className={styles.Toolbar}
    />
  </div>
));

/**
 onClick={searching ? this.handleNavClick : null}
 onClick={this.handleActionClick}
 */
