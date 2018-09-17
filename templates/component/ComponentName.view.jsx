import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './ComponentName.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.ComponentName}>
    <h2 className={styles['ComponentName-head']}>ComponentName Head</h2>
    <div className={styles['ComponentName-dialog']}>
      <div className={styles['ComponentName-dialog__main']}>
        <p className={styles['ComponentName-body']}>ComponentName body: Count = {state.componentNameCount}
        </p>
      </div>
      <div className={styles['ComponentName-dialog__button']}>
        <Button primary raised onClick={effects.incComponentNameCount}>Increment</Button>
      </div>
    </div>
  </div>
));
