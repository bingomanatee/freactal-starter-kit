import pageList from './pageList.json';

export default (bottle) => {
  bottle.factory('pageProvider', ({
    NODE_ENV, ADMIN_API_URL, ADMIN_MODE, axios,
  }) => ({
    all: () => {
      if (NODE_ENV === 'development') {
        if (ADMIN_MODE) {
          return axios.get(`${ADMIN_API_URL}/api/pages`, { responseType: 'json' });
        }
      }
      return Promise.resolve(pageList);
    },

  }));
};
