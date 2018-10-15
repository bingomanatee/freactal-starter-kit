import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelOne.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PanelOne}>
    Explanatory text for PanelOne
  </div>
));
