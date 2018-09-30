import { Button } from 'react-md';
import { injectState } from 'freactal';
import lib from '../../lib';
import style from './Header.module.css';

export default injectState(({ state, effects }) => {
  let user;
  if (lib.isLoggedIn(state)) {
    if (state.profile) {
      user = (
        <div className={style['header-user']}>
          <span className={style['header-user__item']}>
            Logged in as {state.profile.name}
          </span>
          <span className={style['header-user__item']}>
            <Button
              flat
              onClick={() => effects.logout()}
              className={style.NavButton}
            >Log Out
            </Button>
          </span>
        </div>
      );
    } else {
      user = <div>loading...</div>;
    }
  } else {
    user = (
      <Button flat onClick={effects.login} className={style.NavButton}>Log In
      </Button>
    );
  }
  return user;
});
