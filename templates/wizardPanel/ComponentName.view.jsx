import { Button, Grid, Cell } from 'react-md';
import { injectState } from 'freactal';
import TextField from 'SOURCE_ROOThelpers/input/TextField';

import styles from './ComponentName.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.ComponentName}>
    Explanatory text for ComponentName
    <section>
      <Grid>
        wizardPanelFields
      </Grid>
    </section>
  </div>
));
