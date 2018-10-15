import { Button } from 'react-md';
import { injectState } from 'freactal';
import styles from './NewWizard.module.css';
import lib from './../..//lib';
import Wizard from './../..//helpers/wizard/Wizard';

import PanelOne from "./PanelOne";
import PanelTwo from "./PanelTwo";;

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  if (!state.newWizardWizardController) return '';
  return (
    <section className={styles.NewWizard}>
      <Wizard controller={state.newWizardWizardController} index={state.newWizardWizardIndex}>
          <div title="First Panel">
   <PanelOne panel={state.newWizardWizardController.panels[0]} />
</div>
<div title="Second Panel">
   <PanelTwo panel={state.newWizardWizardController.panels[1]} />
</div>

      </Wizard>
      <Button
        raised
        primary
        onClick={() => state.newWizardWizardController.nextPanel()}
      >Next Panel
      </Button>
    </section>
  );
});
