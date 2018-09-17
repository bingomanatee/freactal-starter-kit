import { injectState } from 'freactal';
import styles from './ComponentName.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.ComponentName}>
    <h2 className={styles['ComponentName-head']}>ComponentName Head</h2>
    <p className={styles['ComponentName-body']}>Component Name body: Count = {state.componentNameCount}
      <button className={styles['ComponentName-button']} onClick={effects.incComponentNameCount}>Increment</button>
    </p>
  </div>
));
