import { injectState } from 'freactal';
import styles from './PageOne.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageOne}>
    <h2 className={styles['PageOne-head']}>PageOne Head</h2>
    <p className={styles['PageOne-body']}>Component Name body: Count = {state.pageOneCount}
      <button className={styles['PageOne-button']} onClick={effects.incPageOneCount}>Increment</button>
    </p>
  </div>
));
