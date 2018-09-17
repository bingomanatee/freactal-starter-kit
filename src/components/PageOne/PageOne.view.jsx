import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PageOne.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageOne}>
    <h2 className={styles['PageOne-head']}>PageOne Head</h2>
    <div className={styles['PageOne-dialog']}>
      <div className={styles['PageOne-dialog__main']}>
        <p className={styles['PageOne-body']}>PageOne body: Count = {state.pageOneCount}
        </p>
      </div>
      <div className={styles['PageOne-dialog__button']}>
        <Button primary raised onClick={effects.incPageOneCount}>Increment</Button>
      </div>
    </div>
  </div>
));
