// @flow
import * as React from 'react';
import IndicatorAmount from 'packages/antd-indicator-amount';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper(1000)
class IndicatorAmountDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value}= this.props;
    return (
      <React.Fragment>
        <Divider>Indicator Amount</Divider>
        <IndicatorAmount
          refId={new RefId("indicator-amount")}
          value={value}
          title='Monthly Revenue'
          uiParams={{
            formatter: v => `$${v}`,
            note: "hello this is a note"
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
        <IndicatorAmountDemo1/>
      </React.Fragment>
    )
  }
}