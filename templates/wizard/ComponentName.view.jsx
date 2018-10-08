import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './ComponentName.module.css';
import lib from './../../src/lib';

const { WizardComponent: Wizard } = lib;

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  if (!state.componentNameWizardController) return '';
  return (
    <div className={styles.ComponentName}>
      <h1>ComponentTitle</h1>
      <Wizard controller={state.componentNameWizardController}>
        <div>
          First Panel
        </div>
        <div>
          Second Panel
        </div>
      </Wizard>
    </div>
  );
});
