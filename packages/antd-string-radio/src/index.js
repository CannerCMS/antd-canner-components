// @flow
import React, { Component } from "react";
import { Radio } from "antd";
import { isObjectLike } from "lodash";
const RadioGroup = Radio.Group;

import type {FieldId, OnChangeFn} from 'types/DefaultProps';

type Props = {
  id: FieldId,
  value: string,
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    defaultSelected: number,
    defaultChecked?: number
  },
  onChange: OnChangeFn
};

export default class RadioString extends Component<Props> {
  onChange = (val: any) => {
    this.props.onChange(this.props.id, "update", val.target.value);
  };

  render() {
    const { value, uiParams } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      margin: "10px 0"
    };
    const options = uiParams.options || [];
    let { defaultSelected, defaultChecked } = uiParams;

    // backward support
    if (defaultChecked) {
      defaultSelected = defaultChecked;
    }

    return (
      <div id="radio">
        <RadioGroup
          onChange={this.onChange}
          value={
            value ||
            (isObjectLike(options[defaultSelected])
              ? options[defaultSelected].value
              : options[defaultSelected])
          }
        >
          {options &&
            options.map((selection, i) => {
              /* backward support */
              if (!isObjectLike(selection)) {
                return (
                  <Radio style={radioStyle} value={selection} key={i}>
                    {selection}
                  </Radio>
                );
              }

              const { text, value } = selection;
              return (
                <Radio style={radioStyle} value={value} key={i}>
                  {text || value}
                </Radio>
              );
            })}
        </RadioGroup>
      </div>
    );
  }
}
