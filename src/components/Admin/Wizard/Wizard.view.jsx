import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './Wizard.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Wizard}>
    <h2 className={styles['Wizard-head']}>Wizard Head</h2>
    <div className={styles['Wizard-dialog']}>
      <div className={styles['Wizard-dialog__main']}>
        <p className={styles['Wizard-body']}>Wizard body: Count = {state.wizardCount}
        </p>
      </div>
      <div className={styles['Wizard-dialog__button']}>
        <Button primary raised onClick={effects.incWizardCount}>Increment</Button>
      </div>
    </div>
  </div>
));
