import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './ComponentName.module.css';
import lib from 'SOURCE_ROOT/lib';
import Wizard from 'SOURCE_ROOT/helpers/wizard/Wizard';

WizardPanelImports;

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  if (!state.componentNameWizardController) return '';
  return (
    <section className={styles.ComponentName}>
      <Wizard controller={state.componentNameWizardController}>
          WizardPanels
      </Wizard>
      <Button
        raised
        primary
        onClick={() => state.componentNameWizardController.nextPanel()}
      >Next Panel
      </Button>
    </section>
  );
});
