// @flow
import * as React from 'react';
import Mde from 'packages/antd-string-mde';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper("# this is markdown editor")
class MarkdownDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>General mde</Divider>
        <Mde
          refId={new RefId("mde")}
          value={value}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

class MarkdownDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled mde</Divider>
        <Mde
          refId={new RefId("mde")}
          value={value}
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
        <MarkdownDemo1/>
        <MarkdownDemo2/>
      </React.Fragment>
    )
  }
}