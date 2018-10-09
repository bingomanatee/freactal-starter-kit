import { injectState } from 'freactal';
import Switch from './Switch';

export default injectState((props) => {
  if (props.fsubject) {
    props.subject = props.state[props.fsubject];
  }
  return <Switch {...props}>{props.children}</Switch>;
});
