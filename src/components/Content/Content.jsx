import { injectState } from 'freactal';
import { Component } from 'react';

import contentState from './Content.state';
import ContentView from './Content.view.jsx';
import lib from '../../lib';

export default contentState(injectState(class Content extends Component {
  componentDidMount() {
    const { pagesLoaded, pagesLoading } = this.props.state;
    if (!(pagesLoaded || pagesLoading)) {
      this.props.effects.loadPages();
    }
  }

  get pages() {
    if (this.props.state.pages) {
      return this.props.state.pages.map((pageDef) => {
        if (!pageDef.published) {
          return false;
        }
        const component = lib.pages.componentMap.get(pageDef.component);
        if (!component) {
          return false;
        }
        return Object.assign({}, pageDef, { component });
      })
        .filter(a => a)
        .sort((a, b) => a.order - b.order);
    }
    return [];
  }

  render() {
    return (
      <ContentView pages={this.pages} />
    );
  }
}));
