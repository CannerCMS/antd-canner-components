// @flow

import React, { Component } from "react";
import { Input } from "antd";

type Props = defaultProps & {
  value: string
};

export default class NumberInput extends Component<Props> {
  onChange = (e: any) => {
    const value = parseInt(e.target.value) || 0;
    this.props.onChange(this.props.id, "update", value);
  };

  render() {
    const { value, readOnly } = this.props;
    return (
      <div id="input">
        <Input disabled={readOnly} type="text" value={value} onChange={this.onChange} />
      </div>
    );
  }
}
