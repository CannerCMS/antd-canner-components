// @flow
import React, { PureComponent } from "react";
import { Radio } from "antd";
const RadioGroup = Radio.Group;

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';

type Props = StringDefaultProps & {
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    defaultSelected?: number
  }
};

export default class RadioString extends PureComponent<Props> {
  static defaultProps = {
    uiParams: {
      options: []
    }
  }

  onChange = (val: any) => {
    this.props.onChange(this.props.id, "update", val.target.value);
  };

  render() {
    const { value, disabled, uiParams } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      margin: "10px 0"
    };
    const options = uiParams.options || [];
    let { defaultSelected } = uiParams;

    return (
      <RadioGroup
        disabled={disabled}
        onChange={this.onChange}
        value={
          value ||
          (defaultSelected !== undefined
            && options[defaultSelected]
            && options[defaultSelected].value)
        }
      >
        {options &&
          options.map((selection, i) => {

            const { text, value } = selection;
            return (
              <Radio style={radioStyle} value={value} key={i}>
                {text || value}
              </Radio>
            );
          })}
      </RadioGroup>
    );
  }
}
