import { Button, Grid, Cell } from 'react-md';
import { injectState } from 'freactal';
import TextField from './../../../helpers/input/TextField';

import styles from './PanelTwo.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => {
  console.log('panel 2 state panel:', state.panel);
  return (<div className={styles.PanelTwo}>
    Explanatory text for PanelTwo
    <section>
      <Grid>

        <Cell size={6} tabletSize={4} phoneSize={4}>
          <TextField
            label="beta"
            id="6"
            value={state.beta}
            onChange={effects.setBeta}
          />
        </Cell>


        <Cell size={6} tabletSize={4} phoneSize={4}>
          <TextField
            label="gamma"
            id="7"
            value={state.gamma}
            onChange={effects.setGamma}
          />
        </Cell>

      </Grid>
    </section>
          </div>);
});
