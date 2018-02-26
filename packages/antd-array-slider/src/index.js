// @flow
import React, { Component } from "react";
import { Slider } from "antd";
import {List} from 'immutable';

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
  static defaultProps = {
    value: new List().push(0).push(100)
  }

  onChange = (val: Array<number>) => {
    const { id, transformData } = this.props;
    this.props.onChange(id, "update", transformData(val));
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