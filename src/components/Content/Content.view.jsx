import { Route, Switch } from 'react-router-dom';
import lib from '../../lib';
import styles from './Content.module.css';

// eslint-disable-next-line no-unused-vars
export default ({ pages: pageDefs }) => (
  <div className={styles.Content}>
    <Switch>
      {pageDefs.map((pageDef, i) =>
// eslint-disable-next-line react/no-array-index-key
        (<Route
          key={`${pageDef.route}_${i}`}
          path={pageDef.route}
          exact={pageDef.exact}
          component={lib.componentMap.get(pageDef.component)}
        />))}
    </Switch>
  </div>
);
