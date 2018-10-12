import { Button, TextField, Grid, Cell, Snackbar, FontIcon } from 'react-md';
import { injectState } from 'freactal';
import _ from 'lodash';
import Switch from '../../../helpers/logical/Switch';
import styles from './Wizard.module.css';
import PanelEditor from './PanelEditor';
import Case from '../../../helpers/logical/Switch/Case';
import FieldErrors from '../../../helpers/input/FieldErrors';
import ButtonBar from '../../../helpers/buttons/ButtonBar/ButtonBar';
import util from 'util';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  const { wizardController, isEditingWizard } = state;
  return (
    <div className={styles.Wizard}>
      <h1 className={styles['Wizard-head']}>Create a Wizard</h1>
      <div className={styles['wizard-form']}>
        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Global Values</h2>
          {wizardController && (<Grid>
            <Cell size={4} tabletSize={3} phoneSize={4}>
              <Switch subject={isEditingWizard}>
                <Case istrue>
                  <TextField
                    id="wizard-title"
                    label="Title of Wizard"
                    value={state.wizardTitle || ''}
                    onChange={effects.setWizardTitle}
                  />
                </Case>
                <Case else>
                  <div>
                    <p><b>Title:</b></p>
                    <p>{wizardController ? wizardController.title || '(empty)' : ''}</p>
                    <FieldErrors subject={wizardController} field="title" />
                  </div>
                </Case>
              </Switch>
            </Cell>
            <Cell size={4} tabletSize={3} phoneSize={4}>
              <Switch subject={isEditingWizard}>
                <Case istrue>
                  <TextField
                    id="wizard-name"
                    label="Filename of wizard"
                    value={state.wizardFileName || ''}
                    onChange={effects.setWizardFileName}
                  />
                </Case>
                <Case else>
                  <div>
                    <p>
                      <b>Filename:</b>
                    </p>
                    <p>
                      {wizardController ? wizardController.fileName || '(empty)' : ''}
                    </p>
                    <FieldErrors subject={wizardController} field="fileName" />
                  </div>
                </Case>
              </Switch>
            </Cell>
            <Cell size={4} tabletSize={2} phoneSize={4}>
              <ButtonBar small>
                <Switch subject={isEditingWizard}>
                  <Case istrue>
                    <Button
                      primary
                      flat
                      onClick={effects.saveWizardChanges}
                    >
                      Save
                    </Button>
                  </Case>
                </Switch>
                <Switch subject={isEditingWizard}>
                  <Case istrue>
                    <Button
                      secondary
                      flat
                      onClick={effects.cancelWizardChanges}
                    >
                      <FontIcon
                        iconClassName="fa fa-ban"
                        secondary
                      />
                    </Button>
                  </Case>
                  <Case else>
                    <Button
                      primary
                      flat
                      onClick={() => effects.isEditingWizardOn()}
                    >
                    Edit
                    </Button>
                  </Case>
                </Switch>
              </ButtonBar>
            </Cell>
          </Grid>)}
        </div>

        <div className={`md-paper--3 ${styles['wizard-form-panel']}`}>
          <h2 className={styles['wizard-form-panel__title']}>Panels</h2>
          <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
            <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
              <Button secondary flat onClick={() => effects.addPanel(-1)}>Add Panel</Button>
            </div>
          </div>
          {state.wizardPanels &&
          state.wizardPanels.map(panel => <PanelEditor key={`panel_${panel.id}`} panel={panel} />)}
        </div>

        {(wizardController && wizardController.errors && wizardController.errors.length) && (
          <div className={styles['wizard-form__errors']}>
            {wizardController.errors.map(({ message }) => (<span>{message}</span>))}
          </div>
        )}

        <div className={styles['buttons-bar']}>
          <div className={styles['buttons-bar__cell']}>
            <Button
              primary
              raised
              disabled={Boolean(wizardController && (
                !(wizardController.isValid && wizardController.panelIsValid)
              ))}
              onClick={effects.saveWizard}
            >Create Wizard
            </Button>
            <FieldErrors
              subject={wizardController}
              errors={wizardController && wizardController.panelErrors}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>wizard</h3>
        {0 && (
          [
            <pre>
              {wizardController ? JSON.stringify(wizardController.toJSON(), true, 4) : 'no wizard controller'}
            </pre>,
            <h3>wizardPanels</h3>,
            <pre>,
              {state.wizardPanels ? JSON.stringify(state.wizardPanels.map(p => p.toJSON()), true, 4) : 'no wizard panels'}
            </pre>,
            <h3>Panel Errors</h3>,
            <pre>{wizardController && JSON.stringify(wizardController.panelErrors)}</pre>,
          ]
        )}

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
