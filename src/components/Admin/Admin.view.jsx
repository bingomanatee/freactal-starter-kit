import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './Admin.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Admin}>
    <h2 className={styles['Admin-head']}>Admin Head</h2>
    <div className={styles['Admin-dialog']}>
      <div className={styles['Admin-dialog__main']}>
        <p className={styles['Admin-body']}>Admin body: Count = {state.adminCount}
        </p>
      </div>
      <div className={styles['Admin-dialog__button']}>
        <Button primary raised onClick={effects.incAdminCount}>Increment</Button>
      </div>
    </div>
  </div>
));
