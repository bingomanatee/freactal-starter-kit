import { Button, Grid, Cell } from 'react-md';
import { injectState } from 'freactal';
import TextField from './../../../helpers/input/TextField';

import styles from './PanelTwo.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PanelTwo}>
    Explanatory text for PanelTwo
    <section>
      <Grid>

        <Cell size={12} tabletSize={8} mobileSize={6}>
          <TextField id="6" value={state.beta} onChange={effects.onSetBeta} />
        </Cell>


        <Cell size={12} tabletSize={8} mobileSize={6}>
          <TextField id="7" value={state.Gamma} onChange={effects.onSetGamma} />
        </Cell>

      </Grid>
    </section>
  </div>
));
