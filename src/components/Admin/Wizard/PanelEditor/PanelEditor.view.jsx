import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelEditor.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PanelEditor}>
    <h2 className={styles['PanelEditor-head']}>PanelEditor Head</h2>
    <div className={styles['PanelEditor-dialog']}>
      <div className={styles['PanelEditor-dialog__main']}>
        <p className={styles['PanelEditor-body']}>PanelEditor body: Count = {state.panelEditorCount}
        </p>
      </div>
      <div className={styles['PanelEditor-dialog__button']}>
        <Button primary raised onClick={effects.incPanelEditorCount}>Increment</Button>
      </div>
    </div>
  </div>
));
