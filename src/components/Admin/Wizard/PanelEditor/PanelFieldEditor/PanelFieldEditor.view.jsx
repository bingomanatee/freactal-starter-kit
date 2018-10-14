import {
  TableRow,
  TableColumn,
  Button,
  SelectField, FontIcon,
} from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelFieldEditor.module.css';
import DeleteButton from '../../../../../helpers/buttons/DeleteButton';
import TextField from '../../../../../helpers/input/TextField.jsx';

const small = {
  width: '0.1%',
  whiteSpace: 'nowrap',
};
const TYPES = [
  { label: 'string', value: 'String' },
  { label: 'integer', value: 'Int' },
  { label: 'float', value: 'Float' },
  { label: 'date', value: 'Date' },
  { label: 'object', value: 'Object' },
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
      <Button secondary flat onClick={() => cancelFieldEdit(panelField)}>
        <FontIcon
          iconClassName="fa fa-ban"
          secondary
        />
      </Button>
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
      <DeleteButton onClick={() => deletePanelField(panelField)} />
    </TableColumn>
  </TableRow>
)));
