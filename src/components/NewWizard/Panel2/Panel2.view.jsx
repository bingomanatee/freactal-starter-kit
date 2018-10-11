import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './Panel2.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Panel2}>
    <h2 className={styles['Panel2-head']}>Panel2 Head</h2>
    <div className={styles['Panel2-dialog']}>
      <div className={styles['Panel2-dialog__main']}>
        <p className={styles['Panel2-body']}>Panel2 body: Count = {state.panel2Count}
        </p>
      </div>
      <div className={styles['Panel2-dialog__button']}>
        <Button primary raised onClick={effects.incPanel2Count}>Increment</Button>
      </div>
    </div>
  </div>
));
