// @flow
import React, { PureComponent } from "react";
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

export default class NumberRate extends PureComponent<Props> {
  onChange = (val: number) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", val);
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
