import { List, ListItem } from 'react-md';
import { withRouter } from 'react-router-dom';
import styles from './Admin.module.css';

// eslint-disable-next-line no-unused-vars
export default withRouter(({ pages, history }) => (
  <div className={styles.Admin}>
    <h1 className={styles['Admin-head']}>FSK Admin Page</h1>
    <p>
      This is a page for generative scripts to create other pages, manage
      your site&apos;s structure, etc.
    </p>
    <List className={styles['AdminPageList']} >
      {pages
        .sort((a, b) => a.order = b.order)
        .map(pageDef => (<ListItem
          key={pageDef.id || pageDef.route}
          className={styles['AdminPageList__item']}
          style={({ color: pageDef.route === '/' ? '#CCC' : 'inherit' })}
          primaryText={pageDef.navTitle + (pageDef.notes ? ` - ${pageDef.notes}` : '')}
          onClick={() => history.push(pageDef.route)}
        />))}
    </List>
  </div>
));

/*

 */
