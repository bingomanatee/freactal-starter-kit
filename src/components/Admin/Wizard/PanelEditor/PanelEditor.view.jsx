import { Button, TextField } from 'react-md';
import { injectState } from 'freactal';
import styles from './PanelEditor.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({
  effects: {
    editingPanelOn, setPanelTitle, saveEditPanel, addPanel, cancelEditPanel,
  },
  state: {
    editingPanel, panelTitle, panel,
  },
}) => (
  <div className={styles.PanelEditor}>
    <h3 className={styles['PanelEditor-head']}>{panel.order + 1}: Wizard
      Panel &quot;{panel.title}&quot; (id = {panel.id})
    </h3>
    {editingPanel && <div>
      <TextField
        id={`panel-title-${panel.order}`}
        label="Title of Panel"
        value={panelTitle}
        onChange={setPanelTitle}
      />
    </div>}
    <div className={`${styles['buttons-bar']} ${styles['buttons-bar--small']}`}>
      <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
        {(!editingPanel) && <Button primary flat onClick={editingPanelOn}>Edit</Button>}
        {(editingPanel) && <Button primary flat onClick={saveEditPanel}>Save</Button>}
      </div>
      <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
        {(editingPanel) && <Button secondary flat onClick={cancelEditPanel}>Cancel</Button>}
      </div>
      <div className={`${styles['buttons-bar__cell']} ${styles['buttons-bar__cell--small']}`}>
        {(!editingPanel) && <Button
          secondary
          flat
          onClick={() => addPanel(panel.order)}
        >Add Panel
        </Button>}
      </div>
    </div>
  </div>
));
