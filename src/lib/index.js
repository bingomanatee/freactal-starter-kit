import bottleFn from './bottle';

console.log('getting bottle index:');
// you shouldn't need to use this much but its there if you want it.
export const bottle = bottleFn(true);

console.log('bottle container: ', bottle.container);
// This gives you all the named resources
export default bottle.container;

