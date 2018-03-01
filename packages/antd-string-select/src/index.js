// @flow

import React, { Component } from "react";
import { isObjectLike } from "lodash";
import { Select } from "antd";
const Option = Select.Option;

// types
import type {FieldId, OnChangeFn} from 'types/DefaultProps';

type UIParams = {|
  options?: Array<{
    text: string,
    value: string
  }>,
  defaultSelected?: number
|};

type Props = {
  id: FieldId,
  value: string,
  onChange: OnChangeFn,
  uiParams: UIParams
};

export default class SelectString extends Component<Props> {
  onChange = (val: any) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value } = this.props;
    let { uiParams } = this.props;
    let options = uiParams.options || [];
  
    const { defaultSelected } = uiParams;
    return (
      <div id="select">
        <Select
          style={{ width: 150 }}
          value={
            value ||
            (isObjectLike(options[defaultSelected])
              ? options[defaultSelected].value
              : options[defaultSelected])
          }
          onChange={this.onChange}
        >
          {options.map((selection, i) => {
            const { text, value } = selection;
            return (
              <Option value={value} key={i}>
                {text || value}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}
