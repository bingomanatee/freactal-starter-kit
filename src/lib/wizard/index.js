import WizardController from './WizardController';
import WizardControllerPanel from './WizardControllerPanel';

export default (bottle) => {
  bottle.factory('WizardControllerPanel', () => WizardControllerPanel);
  bottle.factory('WizardController', () => WizardController);
};
