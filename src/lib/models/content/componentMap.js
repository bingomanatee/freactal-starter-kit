import Home from './../Home';
import PageOne from './../PageOne';
import PageTwo from './../PageTwo';
import PageThree from './../PageThree';
import Callback from './../Callback';
import Admin from './../Admin';
import Wizard from './../Admin/Wizard';

const componentMap = new Map();
componentMap.set('components/PageOne', PageOne);
componentMap.set('components/PageTwo', PageTwo);
componentMap.set('components/PageThree', PageThree);
componentMap.set('components/Home', contentComponents.Home);
componentMap.set('components/Callback', contentComponents.Callback);
componentMap.set('components/Admin', contentComponents.Admin);
componentMap.set('components/Admin/Wizard', Wizard);

export default componentMap
