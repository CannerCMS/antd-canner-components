// @flow
import React, { PureComponent } from "react";
import { InputNumber } from "antd";
import isNaN from "lodash/isNaN";


type State = {
  value: string
};

type Props = defaultProps & {
  value: string,
  uiParams: {
    min: number,
    max: number,
    step: number,
    unit: string
  }
};

export default class Input extends PureComponent<Props, State> {
  onChange = (val: any) => {
    const value = isNaN(Number(val)) ? 0 : Number(val);
    this.props.onChange(this.props.id, "update", value);
  }

  render() {
    const { value, uiParams } = this.props;

    let formatter =
      uiParams && uiParams.unit ? val => `${val} ${uiParams.unit}` : val => val;
    return (
      <div id="input">
        <InputNumber
          min={uiParams && uiParams.min}
          max={uiParams && uiParams.max}
          step={uiParams && uiParams.step}
          formatter={formatter}
          value={value} // eslint-disable-line
          onChange={this.onChange}
        />
      </div>
    );
  }
}