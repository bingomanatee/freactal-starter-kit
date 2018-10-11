import { Button, FontIcon } from 'react-md';

const deleteIconStyle = { color: 'red' };
export default props => (
  <Button
    swapTheming
    icon
    {...props}
  >
    <FontIcon
      iconClassName="fa fa-minus-circle"
      secondary
      style={deleteIconStyle}
    />
  </Button>
);
