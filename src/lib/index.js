import bottleFn from './bottle';

// you shouldn't need to use this much but its there if you want it.
export const bottle = bottleFn(true);

// This gives you all the named resources
export default bottle.container;
