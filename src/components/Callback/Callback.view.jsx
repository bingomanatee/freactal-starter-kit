/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'react-md';
import { injectState } from 'freactal';
import { Link } from 'react-router-dom';
import styles from './Callback.module.css';
import lib from '../../lib';

/**
 * note - this shouldn't be seen; should
 * automatically route to the saved loginLocation.
 */
export default injectState(({ state }) => (
  <div><h1>Welcome to {lib.SITE_NAME}!</h1>
    <p>Returning to previous location ...
      <Link to={state.loginLocation || '/'}>
        <Button primary raised>Continue </Button>
      </Link>
    </p>
  </div>
));
