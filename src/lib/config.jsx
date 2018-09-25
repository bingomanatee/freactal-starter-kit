

export default (bottle) => {
  bottle.constant('API_URL', process.env.API_URL);
  bottle.constant('UI_URL', process.env.UI_URL);
  bottle.constant('SITE_NAME', 'Mircosoft.com');
  bottle.constant('NODE_ENV', process.env.NODE_ENV);
};
