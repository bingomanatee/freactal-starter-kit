import { Button, TextField, Grid, Cell, Snackbar } from 'react-md';
import { injectState } from 'freactal';
import styles from './Wizard.module.css';
import PanelEditor from './PanelEditor';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  console.log('view state wizardController: ', state.wizardController);
  return (
    <div className={styles.Wizard}>
      <h1 className={styles['Wizard-head']}>Create a Wizard</h1>
      <p>
        This is a &quot;Wizard wizard:&quot; a page for creating multi-step actions.
      </p>

      <div className={styles['wizard-form']}>
        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Global Values</h2>
          {state.wizardController && <Grid>
            <Cell size={6} tabletSize={4}>
              <TextField
                id="wizard-title"
                label="Title of Wizard"
                value={state.wizardController.title || ''}
                onChange={effects.setWizardTitle}
              />
            </Cell>
            <Cell size={5} tabletSize={4}>
              <TextField
                id="wizard-name"
                label="Filename of wizard"
                value={state.wizardController.fileName || ''}
                onChange={effects.setWizardFileName}
              />
            </Cell>
          </Grid>}
          <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
            <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
              <Button primary flat onClick={() => effects.addPanel()}>Add Panel</Button>
            </div>
          </div>
        </div>

        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Panels</h2>
          {state.wizardPanels &&
          state.wizardPanels.map(panel => <PanelEditor key={`panel_${panel.id}`} panel={panel}/>)}
        </div>

        <div className={styles['buttons-bar']}>
          <div className={styles['buttons-bar__cell']}>
            <Button primary raised onClick={effects.saveWizard}>Create Wizard</Button>
          </div>
        </div>
      </div>
      <div>
        <h3>wizard</h3>
        <pre>
          {state.wizardController ? JSON.stringify(state.wizardController.toJSON(), true, 4) : 'no wizard controller'}
        </pre>
        <h3>wizardPanels</h3>
        <pre>
          {state.wizardPanels ? JSON.stringify(state.wizardPanels.map(p => p.toJSON()), true, 4) : 'no wizard panels'}
        </pre>
      </div>
      <Snackbar
        id="wizard-snackbar"
        toasts={state.wizardMessages}
        autohide
        autohideTimeout={4000}
        onDismiss={effects.dismissWizardMessages}
      />
    </div>
  );
});
