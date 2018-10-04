import axios from 'axios';

export default (bottle) => {
  bottle.constant('API_URL', process.env.API_URL);
  bottle.constant('UI_URL', process.env.UI_URL);
  bottle.constant('ADMIN_API_URL', process.env.ADMIN_API_URL);
  bottle.constant('SITE_NAME', 'Mircosoft.com');
  bottle.constant('ADMIN_MODE', process.env.ADMIN_MODE);
  bottle.constant('NODE_ENV', process.env.NODE_ENV);
  bottle.factory('axios', () => axios);
};
