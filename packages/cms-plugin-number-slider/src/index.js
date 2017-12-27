// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";

type Props = defaultProps & {
  value: number,
  uiParams: {
    min: number,
    max: number,
    step: number,
    unit: number
  }
};

export default class NumberSlider extends Component<Props> {
  onChange = (val: number) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value, uiParams } = this.props;
    let tipFormatter =
      uiParams && uiParams.unit ? val => `${val} ${uiParams.unit}` : val => val;
    return (
      <Slider
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
