// @flow
import React, { Component } from "react";
import { Rate } from "antd";

// type
import type {NumberDefaultProps} from 'types/NumberDefaultProps';

type Props = NumberDefaultProps & {
  uiParams: {
    count: number,
    allowHalf: boolean,
    character: string
  }
};

export default class NumberRate extends Component<Props> {
  onChange = (val: number) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value, uiParams, disabled } = this.props;
    return (
      <Rate
        disabled={disabled}
        count={uiParams && uiParams.count}
        allowHalf={uiParams && uiParams.allowHalf}
        character={uiParams && uiParams.character}
        value={+value} // eslint-disable-line
        onChange={this.onChange}
      />
    );
  }
}
