// @flow
import * as React from 'react';
import NumberRate from 'packages/antd-number-rate';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper(2)
class NumberRateDemo1 extends React.Component<PrimitiveTypes<number>> {
  render() {
    const {value, onChange}= this.props;
    return (
      <React.Fragment>
        <Divider>Number rate</Divider>
        <NumberRate
          refId={new RefId("number-rate")}
          value={value}
          uiParams={{
            allowHalf: true
          }}
          onChange={onChange}
          />
      </React.Fragment>
    )
  }
}


class NumberRateDemo2 extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>Disabled number rate</Divider>
        <NumberRate
          refId={new RefId("number-rate")}
          disabled
          value={2.5}
          uiParams={{
            allowHalf: true
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <NumberRateDemo1/>
        <NumberRateDemo2/>
      </React.Fragment>
    )
  }
}