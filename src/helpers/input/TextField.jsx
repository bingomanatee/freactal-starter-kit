import { TextField as ReactMDTextField } from 'react-md';
import React, { Component } from 'react';

export default class Text extends Component {
  constructor(props) {
    super(props);
    this._textFieldProps = Object.assign({}, props);
    this._onChange = props.onChange;
    delete this._textFieldProps.value;
    delete this._textFieldProps.onChange;
    this.state = { value: props.value };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.state.value || nextState.value !== nextProps.value;
  }

  onChange(value) {
    const onChange = this._onChange;
    this.setState({ value }, () => {
      setTimeout(() => onChange(value));
    });
  }

  render() {
    return (<ReactMDTextField
      value={this.state.value}
      onChange={event => this.onChange(event)}
      {...this._textFieldProps}
    />);
  }
}
