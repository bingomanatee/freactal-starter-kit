import { injectState } from 'freactal';
import { Button } from 'react-md';
import { withRouter} from 'react-router-dom';

import styles from './Home.module.css';
import lib from '../../lib';

// eslint-disable-next-line no-unused-vars
export default withRouter(injectState(({ state, effects, history }) => (
  <div className={styles.Home}>
    <h1 className={styles['Home-head']}>Welcome to {lib.SITE_NAME})</h1>
    <ul>
      <li><Button flat style={({ color: '#999' })}>Home Page (You are here)</Button></li>
      <li><Button flat primary onClick={() => history.push('page-one')}>Page One</Button></li>
      <li><Button flat primary onClick={() => history.push('page-two')}>Page Two</Button></li>
    </ul>
  </div>
)));
