// @flow
import * as React from 'react';
import NumberSlider from 'packages/antd-number-slider';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper(4)
class NumberSliderDemo1 extends React.Component<PrimitiveTypes<number>> {
  render() {
    const {value, onChange}= this.props;
    return (
      <React.Fragment>
        <Divider>Number slider</Divider>
        <NumberSlider
          refId={new RefId("number-slider")}
          value={value}
          uiParams={{
            min: 2,
            max: 10,
            step: 2,
            unit: "unit"
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper(4)
class NumberSliderDemo2 extends React.Component<PrimitiveTypes<number>> {
  render() {
    const {value, onChange}= this.props;
    return (
      <React.Fragment>
        <Divider>Disabled number slider</Divider>
        <NumberSlider
          refId={new RefId("number-slider")}
          value={value}
          disabled
          uiParams={{
            min: 2,
            max: 10,
            step: 2,
            unit: "unit"
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <NumberSliderDemo1/>
        <NumberSliderDemo2/>
      </React.Fragment>
    )
  }
}