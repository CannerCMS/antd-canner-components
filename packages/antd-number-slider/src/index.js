// @flow
import React, { PureComponent } from "react";
import { Slider } from "antd";

// type
import type {NumberDefaultProps} from 'types/NumberDefaultProps';

type Props = NumberDefaultProps & {
  uiParams: {
    min: number,
    max: number,
    step: number,
    unit: number
  }
};

export default class NumberSlider extends PureComponent<Props> {
  onChange = (val: number) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value, uiParams, disabled } = this.props;
    let tipFormatter =
      uiParams && uiParams.unit ? val => `${val} ${uiParams.unit}` : val => val;
    return (
      <Slider
        disabled={disabled}
        min={uiParams && uiParams.min}
        max={uiParams && uiParams.max}
        step={uiParams && uiParams.step}
        tipFormatter={tipFormatter}
        {...this.props}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
