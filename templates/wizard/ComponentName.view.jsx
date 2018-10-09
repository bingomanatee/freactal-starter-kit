import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './ComponentName.module.css';
import lib from './../../src/lib';

const { WizardComponent: Wizard } = lib;

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  if (!state.componentNameWizardController) return '';
  return (
    <section className={styles.ComponentName}>
      <Wizard controller={state.componentNameWizardController}>
        <div title="First Panel">
          First Panel
        </div>
        <div title="Second Panel">
          Second Panel
        </div>
      </Wizard>
    </section>
  );
});
