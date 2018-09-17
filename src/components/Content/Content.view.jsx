import { injectState } from 'freactal';
import { Route, withRouter, Switch } from 'react-router-dom';

import styles from './Content.module.css';

import Home from './../Home';
import PageOne from './../PageOne';
import PageTwo from './../PageTwo';

// eslint-disable-next-line no-unused-vars
export default withRouter(injectState(({
  state, effects, text, history,
}) => (
  <div className={styles.Content}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page-one" component={PageOne} />
      <Route path="/page-two" component={PageTwo} />
    </Switch>
  </div>
)));
