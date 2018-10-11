import { Component } from 'react';
/*
import { injectState } from 'freactal';
import { withRouter } from 'react-router-dom';
import buttonBarState from './ButtonBar.state';
*/
import ButtonBarView from './ButtonBar.view.jsx';

export default class ButtonBar extends Component {
  render() {
    return (
      <ButtonBarView>{this.props.children}</ButtonBarView>
    );
  }
};
