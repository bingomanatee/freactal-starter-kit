import { Button, TextField, Grid, Cell, Snackbar } from 'react-md';
import { injectState } from 'freactal';
import _ from 'lodash';
import Switch from '../../../helpers/logical/Switch';
import styles from './Wizard.module.css';
import PanelEditor from './PanelEditor';
import Case from '../../../helpers/logical/Switch/Switch';
import util from 'util';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  const { wizardController, isEditingWizard } = state;
  console.log('=============== view state wizardController: ', wizardController);
  console.log('=============== view state: ', state);
  return (
    <div className={styles.Wizard}>
      <h1 className={styles['Wizard-head']}>Create a Wizard</h1>
      <p>
        This is a &quot;Wizard wizard:&quot; a page for creating multi-step actions.
      </p>
      sample
      <Switch name="sample" subject={isEditingWizard}>
        <Case istrue>
          Is Editing
        </Case>
        <Case else>
          Is Not Editing
        </Case>
      </Switch>

      <div className={styles['wizard-form']}>
        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Global Values</h2>
          {wizardController && (<Grid>
            <Cell size={6} tabletSize={4}>
              {isEditingWizard && (
                <TextField
                  id="wizard-title"
                  label="Title of Wizard"
                  value={state.wizardTitle || ''}
                  onChange={effects.setWizardTitle}
                />)
              }
              {(!isEditingWizard) && (
                <div>
                  <div><b>Title:</b></div>
                  <p>{wizardController ? wizardController.title : ''}</p>
                </div>)}
            </Cell>
            <Cell size={6} tabletSize={4}>
              {isEditingWizard && (<TextField
                id="wizard-name"
                label="Filename of wizard"
                value={state.wizardFileName || ''}
                onChange={effects.setWizardFileName}
              />)}
              {(!isEditingWizard) && (<div>
                <div>
                  <b>Filename:</b>
                </div>
                <p>
                  {wizardController ? wizardController.fileName : ''}
                </p>
              </div>)}
            </Cell>
          </Grid>)}
          <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
            {isEditingWizard && (
              <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
                <Button
                  primary
                  flat
                  onClick={effects.saveWizardChanges}
                >
                Save
                </Button>
              </div>
            )}
            <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
              {isEditingWizard && (<Button
                primary
                flat
                onClick={effects.cancelWizardChanges}
              >
                  Cancel
              </Button>)}
              {(!isEditingWizard) && (
                <Button
                  primary
                  flat
                  onClick={() => effects.isEditingWizardOn()}
                >
                  Edit
                </Button>
              )}
            </div>
            <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
              <Button secondary flat onClick={() => effects.addPanel()}>Add Panel</Button>
            </div>
          </div>
        </div>

        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Panels</h2>
          {state.wizardPanels &&
          state.wizardPanels.map(panel => <PanelEditor key={`panel_${panel.id}`} panel={panel} />)}
        </div>

        {(wizardController && wizardController.errors.length) && (
          <div className={styles['wizard-form__errors']}>
            {wizardController.errors.map(({ message }) => (<span>{message}</span>))}
          </div>
          )}

        <div className={styles['buttons-bar']}>
          <div className={styles['buttons-bar__cell']}>
            <Button primary raised onClick={effects.saveWizard}>Create Wizard</Button>
          </div>
        </div>
      </div>
      <div>
        <h3>wizard</h3>
        <pre>
          {wizardController ? JSON.stringify(wizardController.toJSON(), true, 4) : 'no wizard controller'}
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
