import { Button, Grid, Cell } from 'react-md';
import { injectState } from 'freactal';
import TextField from './../../../helpers/input/TextField';

import styles from './PanelOne.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PanelOne}>
    Explanatory text for PanelOne
    <section>
      <Grid>
        
    <Cell size={12} tabletSize={8} mobileSize={6}>
       <TextField id="3" value={state.alpha} onChange={effects.onSetAlpha} />
    </Cell>
    

    <Cell size={12} tabletSize={8} mobileSize={6}>
       <TextField id="4" value={state.beta} onChange={effects.onSetBeta} />
    </Cell>
    
      </Grid>
    </section>
  </div>
));
