import WizardController from './WizardController';
import WizardControllerPanel from './WizardControllerPanel';
import WizardComponent from './Wizard';

export default (bottle) => {
  bottle.factory('WizardControllerPanel', () => WizardControllerPanel);
  bottle.factory('WizardController', () => WizardController);
  bottle.factory('WizardComponent', () => WizardComponent);
};
