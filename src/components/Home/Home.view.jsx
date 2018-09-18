import { injectState } from 'freactal';
import { List, ListItem } from 'react-md';
import { withRouter } from 'react-router-dom';

import styles from './Home.module.css';
import lib from '../../lib';

// eslint-disable-next-line no-unused-vars
export default withRouter(injectState(({ state, effects, history }) => (
  <div className={styles.Home}>
    <h1 className={styles['Home-head']}>Welcome to {lib.SITE_NAME}</h1>
    <List className={styles['Home-PageList']}>
      <ListItem className={styles['Home-PageList__item']} style={({ color: '#CCC' })} primaryText="Home Page (You are here)" />
      <ListItem className={styles['Home-PageList__item']} onClick={() => history.push('page-one')} primaryText="Page One" />
      <ListItem className={styles['Home-PageList__item']} onClick={() => history.push('page-two')} primaryText="Page Two" />
      <ListItem className={styles['Home-PageList__item']} onClick={() => history.push('page-three')} primaryText="Page Three" />
    </List>
  </div>
)));
