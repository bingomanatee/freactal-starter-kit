import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Button,
  TextField,
  SelectField,
} from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelFieldEditor.module.css';

const small = {
  width: '0.1%',
  whiteSpace: 'nowrap',
};
const TYPES = [
  'text',
  'integer',
  'float',
  'date',
  'other',
];

// eslint-disable-next-line no-unused-vars
export default injectState(({
  state: {
    panelField, editingFieldID, panelFieldName, panelFieldType,
  },
  effects: {
    saveFieldEdit, editPanelField, cancelFieldEdit,
    setPanelFieldName, setPanelFieldType, deletePanelField,
  },
}) => (panelField.id === editingFieldID ? (
  <TableRow>
    <TableColumn><TextField
      id={`field-name-${panelField.id}`}
      label="Field Name"
      fullWidth
      value={panelFieldName}
      onChange={setPanelFieldName}
    />
    </TableColumn>
    <TableColumn><SelectField
      id={`field-type-${panelField.id}`}
      label="Field Type"
      value={panelFieldType}
      onChange={setPanelFieldType}
      className="md-cell"
      fullWidth
      style={({ width: '100%' })}
      menuItems={TYPES}
    />
    </TableColumn>
    <TableColumn style={small}>
      <Button
        primary
        flat
        onClick={() => saveFieldEdit(panelField)}
      >Save
      </Button>
      <Button secondary flat onClick={() => cancelFieldEdit(panelField)}>Cancel</Button>
    </TableColumn>
  </TableRow>
) : (
  <TableRow>
    <TableColumn>{panelField.name}</TableColumn>
    <TableColumn>{panelField.type}</TableColumn>
    <TableColumn style={small}>
      <Button
        primary
        flat
        disabled={!!editingFieldID}
        onClick={() => editPanelField(panelField)}
      >Edit
      </Button>
      <Button
        primary
        flat
        disabled={!!editingFieldID}
        onClick={() => deletePanelField(panelField)}
      >Delete
      </Button>
    </TableColumn>
  </TableRow>
)));