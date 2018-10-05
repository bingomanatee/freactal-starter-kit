import { Button, TextField, Grid, Cell } from 'react-md';
import { injectState } from 'freactal';
import styles from './Wizard.module.css';
import PanelEditor from './PanelEditor';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.Wizard}>
    <h1 className={styles['Wizard-head']}>Create a Wizard</h1>
    <p>
      This is a &quot;Wizard wizard:&quot; a page for creating multi-step actions.
    </p>

    <div className={styles['wizard-form']}>
      <div className={styles['wizard-form-panel']}>
        <h2 className={styles['wizard-form-panel__title']}>Global Values</h2>
        <Grid>
          <Cell size={6} tableSize={4}>
            <TextField
              id="wizard-title"
              label="Title of Wizard"
              value={state.title}
              onChange={effects.setTitle}
            />
          </Cell>
          <Cell size={5} tableSize={4}>
            <TextField
              id="wizard-name"
              label="Filename of wizard"
              value={state.wizardFileName}
              onChange={effects.setWizardFileName}
            />
          </Cell>
        </Grid>
      </div>

      <div className={styles['wizard-form-panel']}>
        <h2 className={styles['wizard-form-panel__title']}>Panels</h2>
        {state.panels.map(panel => <PanelEditor key={`panel_${panel.id}`} panel={panel} />)}
      </div>

      <div className={styles['buttons-bar']}>
        <div className={styles['buttons-bar__cell']}>
          <Button primary raised onClick={effects.createWizard}>Create Wizard</Button>
        </div>
      </div>
    </div>
  </div>
));
