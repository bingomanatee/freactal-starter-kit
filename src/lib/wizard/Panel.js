import { Component } from 'react';

export default class WizardPanel extends Component {
  constructor(props) {
    super(props);
    const panel = (props.panel);
    this.state = { panel };
  }

  render () {
    return (
      <div>
        <h3>{this.state.panel.title}</h3>
      </div>
    )
  }
}
