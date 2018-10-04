/* eslint-disable jsx-a11y/anchor-is-valid */
import { injectState } from 'freactal';
import { Toolbar, Button } from 'react-md';
import { Link } from 'react-router-dom';
import User from './User.view';

// import headerState from './Header.state';

import styles from './Header.module.css';
import lib from '../../lib';

function statePath(state) {
  let location = '';
  if (state.routerLocation && state.routerLocation.pathname) {
    location = state.routerLocation.pathname
      .replace(/^\//, '')
      .replace(/\//g, ':');
  }
  return location;
}

const searching = false;
// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Header}>
    <Toolbar
      id="main-header"
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
        <User />
      )}
      title={<span>
        <Link className={styles['Header-link']} to="/">{lib.SITE_NAME}</Link>
        {statePath(state)}
        (env = {lib.NODE_ENV})
        {lib.ADMIN_MODE ? '(admin mode)' : ''}
      </span>}
      titleId={`${lib.SITE_NAME.toLowerCase().replace(/[\W]+/g, '-')}`}
      className={styles['Header-toolbar']}
    />
  </div>
));

/**
 onClick={searching ? this.handleNavClick : null}
 onClick={this.handleActionClick}
 */
