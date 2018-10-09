/* eslint-disable camelcase */

import PageHome from './components/Home';
import PagePageOne from './components/PageOne';
import PagePageTwo from './components/PageTwo';
import PageAdmin from './components/Admin';
import PageAdminWizard from './components/Admin/Wizard';
import PageNewWizard from './components/NewWizard';

const componentMap = new Map();

componentMap.set('components/Home', PageHome);
componentMap.set('components/PageOne', PagePageOne);
componentMap.set('components/PageTwo', PagePageTwo);
componentMap.set('components/Admin', PageAdmin);
componentMap.set('components/Admin/Wizard', PageAdminWizard);
componentMap.set('components/NewWizard', PageNewWizard);

export default componentMap;
