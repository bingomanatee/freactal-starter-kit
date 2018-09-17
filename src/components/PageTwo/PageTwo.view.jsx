import { injectState } from 'freactal';
import styles from './PageTwo.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageTwo}>
    <h2 className={styles['PageTwo-head']}>PageTwo Head</h2>
    <p className={styles['PageTwo-body']}>Component Name body: Count = {state.pageTwoCount}
      <button className={styles['PageTwo-button']} onClick={effects.incPageTwoCount}>Increment</button>
    </p>
  </div>
));
