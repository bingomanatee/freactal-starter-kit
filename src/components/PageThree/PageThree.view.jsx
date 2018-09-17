import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PageThree.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageThree}>
    <h2 className={styles['PageThree-head']}>PageThree Head</h2>
    <div className={styles['PageThree-dialog']}>
      <div className={styles['PageThree-dialog__main']}>
        <p className={styles['PageThree-body']}>PageThree body: Count = {state.pageThreeCount}
        </p>
      </div>
      <div className={styles['PageThree-dialog__button']}>
        <Button primary raised onClick={effects.incPageThreeCount}>Increment</Button>
      </div>
    </div>
  </div>
));
