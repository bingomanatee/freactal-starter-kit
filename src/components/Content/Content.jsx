import li from 'lorem-ipsum';
import { injectState } from 'freactal';
import { Component } from 'react';
import ContentView from './Content.view.jsx';
import contentState from './Content.state';

const text = ((length) => {
  const out = [];
  let count = length;
  while (--count > 0) {
    out.push(li({ count: 20, unit: 'paragraphs' }));
  }
  return out.map(p => (<p>{p}</p>));
});

export default contentState(injectState(class Content extends Component {
  render() {
    return (
      <ContentView text={text(30)} />
    );
  }
}));
