import pageProvider from './content/page_provider';
import aclProvider from './content/acl_provider';

export default (bottle) => {
  aclProvider(bottle);
  pageProvider(bottle);
};
