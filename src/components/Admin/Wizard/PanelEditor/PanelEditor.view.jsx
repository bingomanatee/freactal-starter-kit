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
      {editingPanel && <Grid>
        <Cell size={6} tabletSize={4}>
          <TextField
            id={`state.panel-title-${panel.order}`}
            label="Title of state.panel"
            value={panelTitle}
            onChange={setPanelTitle}
          />
        </Cell>
        <Cell size={5} tabletSize={4}>
          <TextField
            id="wizard-name"
            label="Filename of panel"
            value={panelFileName}
            onChange={setPanelFileName}
          />
        </Cell>
                       </Grid>}
      {!editingPanel && <Grid>
        <Cell size={6} tabletSize={4}>
          <div><b>Title:</b></div>
          <p>{panelTitle}</p>
        </Cell>
        <Cell size={5} tabletSize={4}>
          <div><b>File Name:</b></div>
          <p>{panelFileName}</p>
        </Cell>
      </Grid>}
      <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          {(!editingPanel) && <Button primary flat onClick={editingPanelOn}>Edit</Button>}
          {(editingPanel) && <Button primary flat onClick={saveEditPanel}>Save</Button>}
        </div>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          <Button
            secondary
            flat
            disabled={editingPanel || !!editingFieldID}
            onClick={() => addPanelField(panel)}
          >Add Field
          </Button>
        </div>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          {(!editingPanel && (!panel.isOnly)) && <DeleteButton
            onClick={() => deletePanel(panel, wizardController)}
          />}
        </div>
      </div>
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

      <div className={`${styles['buttons-bar']}`}>
        <div className={`${styles['buttons-bar__cell']}`}>
      {(editingPanel) && <Button secondary flat onClick={cancelEditPanel}>Cancel</Button>}
      {(!editingPanel) && <Button
        secondary
        flat
        disabled={editingPanel}
        onClick={() => addPanel(panel.order)}
      >Add Panel
      </Button>}
        </div>
      </div>
    </div>
  );
});
