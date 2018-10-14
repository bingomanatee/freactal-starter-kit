/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import {
  Button, TextField, FontIcon,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Grid,
  Cell,
} from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelEditor.module.css';
import PanelField from './PanelFieldEditor';
import DeleteButton from '../../../../helpers/buttons/DeleteButton';
import Switch from '../../../../helpers/logical/Switch';
import Case from '../../../../helpers/logical/Switch/Case';
import FieldErrors from '../../../../helpers/input/FieldErrors';
import ButtonBar from '../../../../helpers/buttons/ButtonBar';

const arrowStyle = {};

export default injectState(({
  effects,
  state,
}) => {
  const {
    panel, editingPanel, wizardController, panelTitle, editingFieldID, panelFields, panelFileName,
  } = state;
  const
    {
      setPanelTitle, saveEditPanel, setPanelFileName, addPanel, addField, cancelEditPanel,
      movePanelUp, movePanelDown, deletePanel, addPanelField, editingPanelOn,
    } = effects;
  return (
    <div className={styles.PanelEditor}>
      <section className={styles.PanelEditor__inner}>
        <h3 className={styles['PanelEditor-head']}>
          Wizard panel &quot;{panel.title}&quot;
        </h3>
        <Grid>
          <Cell size={4} tabletSize={3} phoneSize={4}>
            <Switch subject={editingPanel}>
              <Case istrue>
                <TextField
                  id={`state.panel-title-${panel.order}`}
                  label="Title of state.panel"
                  value={panelTitle || ''}
                  onChange={setPanelTitle}
                /></Case>
              <Case else>
                <div><b>Title:</b></div>
                <p>{panel.title}</p>
              </Case>
            </Switch>
          </Cell>
          <Cell size={4} tabletSize={3} phoneSize={4}>
            <Switch subject={editingPanel}>
              <Case istrue>
                <TextField
                  id="wizard-name"
                  label="Filename of panel"
                  value={panelFileName || ''}
                  onChange={setPanelFileName}
                /></Case>
              <Case else>
                <div><b>File Name:</b></div>
                <p>{panel.fileName}</p>
              </Case>
            </Switch>
          </Cell>
          <Cell size={4} tabletSize={2} phoneSize={4}>
            <ButtonBar small>
              <Switch subject={editingPanel}>
                <Case istrue>
                  <Button primary flat onClick={saveEditPanel}>Save</Button>
                </Case>
                <Case else>
                  <Button primary flat onClick={editingPanelOn}>Edit</Button>
                </Case>
              </Switch>
              <Switch subject={editingPanel}>
                <Case istrue>
                  <Button
                    secondary
                    flat
                    onClick={effects.cancelEditPanel}
                  >
                    <FontIcon
                      iconClassName="fa fa-ban"
                      secondary
                    />
                  </Button>
                </Case>
                <Case else>
                  <DeleteButton
                    disabled={Boolean(panel.isOnly || editingFieldID)}
                    onClick={() => deletePanel(panel, wizardController)}
                  />
                </Case>
              </Switch>
            </ButtonBar>
          </Cell>
        </Grid>

        {(panel && panel.fields) && (<DataTable plain className={styles['PanelEditor-fields-list']}>
          <TableHeader>
            <TableRow>
              <TableColumn>Field</TableColumn>
              <TableColumn style={({ width: '9rem' })}>DataType</TableColumn>
              <TableColumn>&nbsp;</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {panelFields.map(field => <PanelField key={`${field.id}_field`} field={field} />)}
          </TableBody>
        </DataTable>)}
        <ButtonBar>
          <Button
            secondary
            flat
            disabled={editingPanel || !!editingFieldID}
            onClick={() => addPanelField(panel)}
          >Add Field
          </Button>
        </ButtonBar>

        {(!panel.isFirst) && <Button
          className={styles['PanelEditor-nav-button-up']}
          floating
          secondary
          swapTheming
          mini
          disabled={editingPanel}
          onClick={() => movePanelUp(panel, wizardController)}
        ><FontIcon
          iconClassName="fa fa-angle-up"
          secondary
          style={arrowStyle}
        />
        </Button>}
        {(!panel.isLast) && <Button
          className={styles['PanelEditor-nav-button-down']}
          floating
          secondary
          swapTheming
          mini
          disabled={editingPanel}
          onClick={() => movePanelDown(panel, wizardController)}
        ><FontIcon
          iconClassName="fa fa-angle-down"
          secondary
          style={arrowStyle}
        />
        </Button>}
      </section>

      {(!editingPanel) && (
        <ButtonBar>
          <Button
            secondary
            flat
            disabled={editingPanel}
            onClick={() => addPanel(panel.order)}
          >Add Panel
          </Button>
        </ButtonBar>
      )}
    </div>
  );
});
