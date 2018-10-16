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
        
    <Cell size={6} tabletSize={4} phoneSize={4}>
       <TextField label="alpha" id="3" value={state.alpha} 
       onChange={effects.setAlpha} />
    </Cell>
    

    <Cell size={6} tabletSize={4} phoneSize={4}>
       <TextField label="beta" id="4" value={state.beta} 
       onChange={effects.setBeta} />
    </Cell>
    
      </Grid>
    </section>
  </div>
));
