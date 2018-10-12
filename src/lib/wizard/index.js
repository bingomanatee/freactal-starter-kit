/* eslint-disable babel/new-cap */
import WizardController from './WizardController';
import WizardControllerPanel from './WizardControllerPanel';
import WCPField from './WCPField';

export default (bottle) => {
  WizardController(bottle);
  WizardControllerPanel(bottle);
  WCPField(bottle);
};
