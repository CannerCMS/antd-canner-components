// @flow

import React, { Component } from "react";
import { Input } from "antd";

type Props = {
  value: string,
  onChange: defaultProps.onChange,
  id: defaultProps.id,
  disabled: defaultProps.disabled
};

export default class NumberInput extends Component<Props> {
  onChange = (e: any) => {
    const value = parseInt(e.target.value) || 0;
    this.props.onChange(this.props.id, "update", value);
  };

  render() {
    const { value, disabled } = this.props;
    return (
      <Input
        disabled={disabled}
        type="text"
        value={value}
        onChange={this.onChange}
        />
    );
  }
}
