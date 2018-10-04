import pageList from './pageList.json';

export default (bottle) => {
  bottle.factory('aclProvider', ({
    NODE_ENV, ADMIN_MODE,
  }) => ({
    canSeePage: (page) => {
      let access = false;
      console.log('aclProvider: ', page);
      if (!page.access) {
        access = true;
      } else {
        switch (page.access.env) {
          case '*':
            access = true;
            break;

          case 'admin':
            access = ADMIN_MODE;
            break;

          default:
            access = (new RegExp(NODE_ENV, 'i').test(page.access.env));
        }
      }

      return access;
    },

  }));
};
