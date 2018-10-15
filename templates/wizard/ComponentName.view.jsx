import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './ComponentName.module.css';
import lib from 'SOURCE_ROOTlib';
import Wizard from 'SOURCE_ROOThelpers/wizard/Wizard';

WizardPanelImports

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  if (!state.componentNameWizardController) return '';
  return (
    <section className={styles.ComponentName}>
      <Wizard controller={state.componentNameWizardController} index={state.componentNameWizardIndex}>
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
