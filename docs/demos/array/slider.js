// @flow
import * as React from 'react';
import Slider from 'packages/antd-array-slider';
import {List} from 'immutable';
import RefId from 'canner-ref-id';
import {Divider} from 'antd';
import ExampleArrayValueWrapper from '../ExampleArrayValueHoc';
import type {ArrayTypes} from '../types';

@ExampleArrayValueWrapper(List([5, 11]))
export default class SliderArrayDemo extends React.Component<ArrayTypes<number>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Array slider</Divider>
        <Slider
          refId={new RefId("number-slider")}
          value={value}
          uiParams={{
            min: 1,
            max: 20,
            step: 2,
            unit: "unit"
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}