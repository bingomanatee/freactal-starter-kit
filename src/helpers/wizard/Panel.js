import { Component } from 'react';

export default class WizardPanel extends Component {
  constructor(props) {
    super(props);
    const panel = (props.panel);
    this.state = { panel };
  }

  get classes() {
    return this.state.panel.classes;
  }

  render() {
    return (
      <div className={this.classes}>
        <h3>{this.state.panel.title}</h3>
        {this.state.panel.content || ''}
      </div>
    );
  }
}