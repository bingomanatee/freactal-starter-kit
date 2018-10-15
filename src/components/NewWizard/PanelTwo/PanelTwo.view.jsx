import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelTwo.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PanelTwo}>
    Explanatory text for PanelTwo
  </div>
));
