import { provideState, update } from 'freactal';
import seedFactory from 'freactal-seed';
import lib from '../../lib';

/**
 * This is the topmost state; its values will be kept in local storage.
 */
const Seed = seedFactory();

const appState = new Seed();
appState.useLocalStorage(true);

appState.addObjectAndSetEffect('routerLocation', {});
appState.addBoolPropAndEffects('pagesLoaded', false);
appState.addBoolPropAndEffects('pagesLoading', false);
appState.addArrayPropAndSetEffects('pages', []);
appState.addSideEffect('resetPageState', ({ pagesLoadingOff, pagesLoadedOff, setPages }) => pagesLoadingOff()
  .then(() => pagesLoadedOff())
  .then(() => setPages([])));
appState.addStateSideEffect('loadPages', (
  {
    setPages, pagesLoadingOn, pagesLoadingOff, pagesLoadedOn,
  },
  { pages, pagesLoading, pagesLoaded },
) => {
  if (!(pagesLoaded || pagesLoading)) {
    return pagesLoadingOn()
      .then(() => lib.pageProvider.all()
        .then((pgs) => {
          console.log('pages:', pgs);
          return setPages(pgs.pages);
        }))
      .then(pagesLoadingOff)
      .then(pagesLoadedOn)
      .catch(err => console.log('page load error: ', err));
  }
  return Promise.resolve(pages);
});
appState.addInitializer('pagesLoadingOff', 10);
appState.addInitializer('pagesLoadedOff', 11);
appState.addInitializer(({ pagesLoadingOff }) => {
  console.log('turning pagesLoading off');
  return pagesLoadingOff();
}, 12);
lib.addAuth0ToStateDef(appState);

console.log('state:', appState.toHash());

export default provideState(appState);
