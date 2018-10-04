// @flow
import * as React from 'react';
import Input from 'packages/antd-string-input';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper('This is input value')
class InputDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>General input</Divider>
        <Input
          refId={new RefId("input")}
          value={value}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper()
class InputDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    return (
      <React.Fragment>
        <Divider>Disabled input</Divider>
        <Input
          refId={new RefId("input")}
          value="this is input value"
          disabled
          />
      </React.Fragment>
    )
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <InputDemo1/>
        <InputDemo2/>
      </React.Fragment>
    )
  }
}