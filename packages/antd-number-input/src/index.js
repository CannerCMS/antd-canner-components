// @flow
import React, { PureComponent } from "react";
import { InputNumber } from "antd";
import isNaN from "lodash/isNaN";

// type
import type {NumberDefaultProps} from 'types/NumberDefaultProps';

type State = {
  value: string
};

type Props = NumberDefaultProps & {
  uiParams: {
    min?: number,
    max?: number,
    step?: number,
    unit?: string,
    formatter?: Function,
    precision?: number,
    parser?: Function,
    width?: number
  }
};

export default class Input extends PureComponent<Props, State> {
  onChange = (val: number) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", val);
  }

  render() {
    const { value, uiParams, disabled } = this.props;
    let formatter = uiParams && uiParams.formatter;
    let parser = uiParams && uiParams.parser;
    const unit = uiParams && uiParams.unit;
    if (!formatter) {
      formatter = 
      unit ? val => `${val} ${uiParams.unit}` : val => val;
    }

    if (!parser) {
      const reg = new RegExp(unit, 'g');
      parser =
        unit ? str => str.replace(reg, '') : num => num;
    }
    return (
      <InputNumber
        style={{width: uiParams && uiParams.width}}
        disabled={disabled}
        min={uiParams && uiParams.min}
        max={uiParams && uiParams.max}
        step={(uiParams && uiParams.step)}
        precision={uiParams && uiParams.precision || 0}
        formatter={formatter}
        parser={parser}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}