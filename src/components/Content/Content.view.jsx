import { injectState } from 'freactal';
import styles from './Content.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects, text }) => (
  <div className={styles.Content}>
    <h2 className={styles['Content-head']}>Content Head (user = {state.user.name})</h2>
    <h3>Component Name body: Count = {state.contentCount}</h3>
    <div className="md-cont">
      <p className={`md-block-centered ${styles['Content-body']}`}>
        {text}
      </p>
    </div>
  </div>
));
