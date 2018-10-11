import { Button, Grid, Cell, Switch, Slider } from 'react-md';
import { injectState } from 'freactal';
import styles from './PageThree.module.css';
import SwitchComp from '../../helpers/logical/Switch/Switch';
import Case from '../../helpers/logical/Switch/Case';
// eslint-disable-next-line no-unused-vars
export default injectState(({ state, effects }) => (
  <div className={styles.PageThree}>
    <h1 className={styles['PageThree-head']}>Switch Test Page</h1>
    <h2>Toggle</h2>
    <Switch
      id="switch-power"
      type="switch"
      label="Toggle"
      name="power"
      value={state.toggle}
      onChange={(toggle) => {
        console.log('toggle set to ', toggle);
        effects.setToggle(toggle);
      }}
    />
    <p>toggle: {state.toggle}</p>
    <Grid>
      <Cell size={6}>
        <h3>Text nodes</h3>
        <SwitchComp subject={state.toggle}>
          <Case istrue>
            True
          </Case>

          <Case else>
            False
          </Case>
        </SwitchComp>
      </Cell>
      <Cell size={6}>
        <h3>dom nodes</h3>
        <SwitchComp subject={state.toggle}>
          <Case istrue>
            <div>True</div>
          </Case>

          <Case else>
            <div>False</div>
          </Case>
        </SwitchComp>
      </Cell>
    </Grid>
    <h2>Index chooser</h2>
    <Slider min={0} max={6} value={state.index} onChange={effects.setIndex} /> <b>{state.index}</b>
    <Grid>
      <Cell size={6}>
        <h3>Text nodes</h3>
        <SwitchComp subject={state.index}>
          <Case is={0}>
            First
          </Case>
          <Case is={1}>
            Second
          </Case>
          <Case is={2}>
            Third
          </Case>
          <Case else>
            Others
          </Case>
        </SwitchComp>
      </Cell>
      <Cell size={6}>
        <h3>Dom nodes</h3>
        <SwitchComp subject={state.index}>
          <Case is={0}>
            <h4>First</h4>
            <p>first text</p>
          </Case>
          <Case is={1}>
            <h4>Second</h4>
            <p>second text</p>
          </Case>
          <Case is={2}>
            <h4>Third</h4>
            <p>third text</p>
          </Case>
          <Case else>
            <h4>Others</h4>
            <p>others text</p>
          </Case>
        </SwitchComp>
      </Cell>
    </Grid>
  </div>
));
