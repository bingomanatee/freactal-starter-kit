import Bottlejs from 'bottlejs';
import config from './config';
import state from './state';

/**
 * this method exists to separate the singleton (in index.js) from a reusable bottle.
 *
 * Every time you call this function it returns a new bottle, with unique resources.
 * This is good for test execution.
 *
 * The index.js on the other hand returns a singleton that traps the output of this function,
 * allowing the app to share the same sandbox.
 *
 * note by default it returns the _container_ which has all the named resources at its disposal.
 * This is fine for most uses but if you want to call decorate or add factories to the bottle
 * its available.
 *
 * @returns {Bottle.IContainer}
 */

export default (getBottle = false) => {
  const bottle = new Bottlejs();
  // pull resources from each library routine
  config(bottle);
  state(bottle);

  return getBottle ? bottle : bottle.container;
};
