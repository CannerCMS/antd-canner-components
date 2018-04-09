// @flow
import * as React from 'react';
import BooleanCard from 'packages/antd-boolean-card';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper(false)
class BooleanCardDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Boolean card</Divider>
        <BooleanCard
          refId={new RefId("boolean-card")}
          value={value}
          uiParams={{
            yesText: "YES!!",
            noText: "NO!!"
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper(false)
class BooleanCardDemo2 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled boolean card</Divider>
        <BooleanCard
          refId={new RefId("boolean-card")}
          disabled
          value={value}
          uiParams={{
            yesText: "YES!!",
            noText: "NO!!"
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
        <BooleanCardDemo1/>
        <BooleanCardDemo2/>
      </React.Fragment>
    )
  }
}