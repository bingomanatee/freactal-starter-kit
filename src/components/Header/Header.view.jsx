import { injectState } from 'freactal';
import { Toolbar, Button } from 'react-md';


import headerState from './Header.state';
import styles from './Header.module.css';
import lib from '../../lib';

const searching = false;
// eslint-disable-next-line no-unused-vars
export default headerState(injectState(({ state, effects }) => (
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
      title={lib.SITE_NAME}
      titleId={lib.SITE_NAME.toLowerCase().replace(/[\W]+/g, '-')}
      className={styles.Toolbar}
    />
  </div>
)));

/**
 onClick={searching ? this.handleNavClick : null}
 onClick={this.handleActionClick}
 */
