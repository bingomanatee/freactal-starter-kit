import { Route, Switch } from 'react-router-dom';
import styles from './Content.module.css';
// eslint-disable-next-line no-unused-vars
export default ({ pages: pageDefs }) => (
  <div className={styles.Content}>
    <Switch>
      {pageDefs.map((pageDef) =>
// eslint-disable-next-line react/no-array-index-key
        (<Route
          key={`${pageDef.route}_${pageDef.id}`}
          path={pageDef.route}
          exact={pageDef.exact}
          component={pageDef.component}
        />))}
    </Switch>
  </div>
);
