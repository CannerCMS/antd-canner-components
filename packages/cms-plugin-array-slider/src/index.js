// @flow
import React, { Component } from "react";
import { Slider } from "antd";
import type {List} from 'immutable';

type Props = defaultProps & {
  value: List<number>,
  uiParams: {
    min: number,
    max: number,
    step: number,
    unit: string
  }
};

export default class RangeSlider extends Component<Props> {
  onChange = (val: Array<number>) => {
    const { id } = this.props;
    this.props.onChange(id, "update", val);
  }

  render() {
    const { value, uiParams } = this.props;

    let tipFormatter =
      uiParams && uiParams.unit ? val => `${val} ${uiParams.unit}` : val => val;
    return (
      <Slider
        range
        min={uiParams && uiParams.min}
        max={uiParams && uiParams.max}
        step={uiParams && uiParams.step}
        tipFormatter={tipFormatter}
        {...this.props}
        onChange={this.onChange}
        value={value.toJS()}
      />
    );
  }
}