// @flow
import React, { Component } from "react";
import { Slider } from "antd";
import {List} from 'immutable';
import {transformData} from '@canner/react-cms-helpers';
// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';

type Props = ArrayDefaultProps<number> & {
  uiParams: {
    min: number,
    max: number,
    step: number,
    unit: string
  }
};

export default class RangeSlider extends Component<Props> {
  static defaultProps = {
    value: List([0, 100])
  }

  onChange = (val: Array<number>) => {
    const { refId } = this.props;
    this.props.onChange(refId, "update", transformData(val));
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