import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PageTwo.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageTwo}>
    <h2 className={styles['PageTwo-head']}>PageTwo Head</h2>
    <div className={styles['PageTwo-dialog']}>
      <div className={styles['PageTwo-dialog__main']}>
        <p className={styles['PageTwo-body']}>PageTwo body: Count = {state.pageTwoCount}
        </p>
      </div>
      <div className={styles['PageTwo-dialog__button']}>
        <Button primary raised onClick={effects.incPageTwoCount}>Increment</Button>
      </div>
    </div>
  </div>
));
