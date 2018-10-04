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
      {state.pages.filter(lib.aclProvider.canSeePage).map((pageDef) => {
        if (!pageDef.published) return '';
        return (<ListItem
          key={pageDef.id || pageDef.route}
          className={styles['Home-PageList__item']}
          style={({ color: pageDef.route === '/' ? '#CCC' : 'inherit' })}
          primaryText={pageDef.navTitle + (pageDef.notes ? ` - ${pageDef.notes}` : '')}
          onClick={() => history.push(pageDef.route)}
        />);
      }).sort((a, b) => a.order - b.order)}
    </List>
  </div>
)));
