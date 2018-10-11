import { Button, FontIcon } from 'react-md';

const deleteIconStyle = { color: 'red' };
export default ({ onClick }) => (
  <Button
    swapTheming
    mini
    onClick={onClick}
  >
    <FontIcon
      iconClassName="fa fa-minus-circle"
      secondary
      style={deleteIconStyle}
    />
  </Button>
);
