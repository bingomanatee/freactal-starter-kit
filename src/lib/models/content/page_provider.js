import pageList from './../../../pageList.json';

export default (bottle) => {
  bottle.factory('pageProvider', ({
    NODE_ENV, ADMIN_API_URL, ADMIN_MODE, axios,
  }) => {
    const provider = {
      all: () => {
        if (NODE_ENV === 'development') {
          if (ADMIN_MODE) {
            return axios.get(`${ADMIN_API_URL}/api/pages`, { responseType: 'json' })
              .then(result => result.data);
          }
        }
        return Promise.resolve(pageList);
      },

      forParent: parentName => provider.all()
        .then((def) => {
          const pages = def.pages.filter(p => p.parent === parentName);
          return Object.assign(def, { pages });
        }),

    };

    return provider;
  });
};
