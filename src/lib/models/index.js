import pageProvider from './content/page_provider';
import aclProvider from './content/acl_provider';
import componentMap from './content/componentMap';
export default (bottle) => {
  aclProvider(bottle);
  pageProvider(bottle);
  componentMap(bottle);
};
