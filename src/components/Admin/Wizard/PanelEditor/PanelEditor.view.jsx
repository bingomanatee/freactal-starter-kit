/* eslint-disable max-len */
import {
  Button, TextField, FontIcon,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelEditor.module.css';
import PanelField from './PanelFieldEditor';

const arrowStyle = {
};

// eslint-disable-next-line no-unused-vars
export default injectState(({
  effects,
  state,
}) => {
  const {
    panel, editingPanel, wizardController, panelTitle, editingFieldID, panelFields,
  } = state;
  const
    {
      editingPanelOn, setPanelTitle, saveEditPanel,
      addPanel, cancelEditPanel, addField,
      movePanelUp, movePanelDown, deletePanel, addPanelField,
    } = effects;
  return (
    <div className={styles.PanelEditor}>
      <h3 className={styles['PanelEditor-head']}>{panel.order + 1}: Wizard
        panel &quot;{panel.title}&quot; (id = {panel.id}) (efid = {editingFieldID}) ({panelFields.length} fields)
      </h3>
      {editingPanel && <div>
        <TextField
          id={`state.panel-title-${panel.order}`}
          label="Title of state.panel"
          value={panelTitle}
          onChange={setPanelTitle}
        />
      </div>}
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
      <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          {(!editingPanel) && <Button primary flat onClick={editingPanelOn}>Edit</Button>}
          {(editingPanel) && <Button primary flat onClick={saveEditPanel}>Save</Button>}
        </div>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          {(editingPanel) && <Button secondary flat onClick={() => addField(panel)}>Add Field</Button>}
          {(!editingPanel && (!panel.isOnly)) && <Button
            primary
            style={({ color: 'red' })}
            flat
            onClick={() => deletePanel(panel, wizardController)}
          >Delete
          </Button>}
        </div>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          {(editingPanel) && <Button secondary flat onClick={cancelEditPanel}>Cancel</Button>}
          {(!editingPanel) && <Button
            secondary
            flat
            onClick={() => addPanel(panel.order)}
          >Add Panel
          </Button>}
        </div>
        <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
          <Button
            secondary
            flat
            disabled={!!editingFieldID}
            onClick={() => addPanelField(panel)}
          >Add Field
          </Button>
        </div>
      </div>
      <Button
        className={styles['PanelEditor-nav-button-up']}
        floating
        secondary
        swapTheming
        mini
        disabled={panel.isFirst}
        onClick={() => movePanelUp(panel, wizardController)}
      ><FontIcon
        iconClassName="fa fa-angle-up"
        secondary
        style={arrowStyle}
      />
      </Button>
      <Button
        className={styles['PanelEditor-nav-button-down']}
        floating
        secondary
        swapTheming
        mini
        onClick={() => movePanelDown(panel, wizardController)}
        disabled={panel.isLast}
      ><FontIcon
        iconClassName="fa fa-angle-down"
        secondary
        style={arrowStyle}
      />
      </Button>
    </div>
  );
});
