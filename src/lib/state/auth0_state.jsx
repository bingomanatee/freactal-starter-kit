import auth0 from 'auth0-js';
import { update } from 'freactal';

export default (bottle) => {
  bottle.factory('auth0.webAuth', (container) => {
    const config = container.config;
    console.log('config:', config);
    return new auth0.WebAuth(config);
  });

  bottle.factory('addAuth0ToStateDef', container => (stateDef) => {
    const { authResultData } = container;
    const webAuth = container.auth0.webAuth;
    const CLEAR_AUTH = {
      accessToken: null, idToken: null, profile: null, expiresAt: null,
    };

    stateDef.addStringAndSetEffect('accessToken', null);
    stateDef.addEffect('logoutIfNotLoggedIn', effects => (state) => {
      if (!container.isLoggedIn(state)) {
        effects.logout();
      }
      return state;
    });
    stateDef.addEffect('setAuthSession', update((state, authResult) => authResultData(authResult)));
    stateDef.addIntAndSetEffect('expiresAt', 0);
    stateDef.addEffect('clearProfile', update({ profile: null }));
    stateDef.addSideEffect('login', effects => effects.saveLoginLocation()
      .then(() => webAuth.authorize())); // sends us to auth0 website

    stateDef.addStringAndSetEffect('loginLocation', '/');
    stateDef.addObjectAndSetEffect('profile', null);

    stateDef.addEffect('logout', update(CLEAR_AUTH));
    stateDef.addStateSideEffect('loadProfile', (effects, state) => {
      if (state.accessToken) {
        container.auth0.webAuth.client.userInfo(state.accessToken, (err, profile) => {
          if (profile) {
            effects.setProfile(profile);
          }
          // @TODO: handle error, else
        });
      }
    });

    stateDef.addSideEffect('handleAuthentication', effects => new Promise((resolve, fail) => {
      webAuth.parseHash(async (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          await effects.setAuthSession(authResult);
          await effects.loadProfile();
          resolve();
        } else if (err) {
          fail(err);
        } else {
          fail(new Error('noop'));
        }
      });
    }));

    stateDef.addEffect('saveLoginLocation', update(() => {
      setTimeout(() => webAuth.authorize(), 100);
      return { loginLocation: container.locationPath() };
    }));

    return stateDef;
  });

  bottle.factory('locationPath', () => container => window.location.pathname);

  bottle.factory('authResultData', container => authResult => (
    {
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: (authResult.expiresIn * 1000) + container.now(),
    }
  ));

  bottle.factory('now', () => () => {
    if (Date.now) {
      return Date.now();
    }
    return new Date().getTime();
  });

  bottle.factory('isLoggedIn', container => ({ expiresAt }) => expiresAt && expiresAt > container.now());

  bottle.factory('auth0.config', container => ({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: `${process.env.UI_URL}/login`,
    responseType: 'token id_token',
    scope: 'openid profile',
  }));
};

