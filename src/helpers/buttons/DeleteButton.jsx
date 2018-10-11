import { Button, FontIcon } from 'react-md';

const deleteIconStyle = { color: 'red' };
export default ({ onClick }) => (
  <Button
    swapTheming
    icon
    onClick={onClick}
  >
    <FontIcon
      iconClassName="fa fa-minus-circle"
      secondary
      style={deleteIconStyle}
    />
  </Button>
);
