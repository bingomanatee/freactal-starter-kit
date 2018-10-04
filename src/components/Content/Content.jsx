import { injectState } from 'freactal';
import { Component } from 'react';

import ContentView from './Content.view.jsx';
import contentState from './Content.state';
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
componentMap.set('components/Home', Home);
componentMap.set('components/Callback', Callback);
componentMap.set('components/Admin', Admin);
componentMap.set('components/Admin/Wizard', Wizard);

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
        const component = componentMap.get(pageDef.component);
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
