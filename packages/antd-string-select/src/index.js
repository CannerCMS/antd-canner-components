// @flow

import React, { Component } from "react";
import { isObjectLike } from "lodash";
import { Select } from "antd";
const Option = Select.Option;

type Props = {
  value: string,
  onChange: defaultProps.onChange,
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    defaultSelected: number
  }
};

export default class SelectString extends Component<Props> {
  onChange = (val: any) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value } = this.props;
    let { uiParams } = this.props;
    if (Array.isArray(uiParams)) {
      // backward capable
      uiParams = {
        options: uiParams,
        defaultSelected: 0
      };
    }

    if (uiParams.texts) {
      uiParams.options = uiParams.options.map((opt, i) => {
        return {
          value: opt,
          text: uiParams[i]
        };
      });
    }
    const options = uiParams.options || [];
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
            /* backward support */
            if (!isObjectLike(selection)) {
              return (
                <Option value={selection} key={i}>
                  {selection}
                </Option>
              );
            }
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
