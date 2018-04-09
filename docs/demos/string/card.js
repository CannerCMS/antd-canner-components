// @flow
import * as React from 'react';
import StringCard from 'packages/antd-string-card';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper('world')
class StringCardDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>String card</Divider>
        <StringCard
          refId={new RefId("string-card")}
          checked={false}
          value={value}
          uiParams={{
            options: [{
              text: "this is hello",
              value: "hello"
            }, {
              text: "this is world",
              value: "world"
            }]
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}


@ExamplePrimitiveValueWrapper('world')
class StringCardDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled string card</Divider>
        <StringCard
          refId={new RefId("string-card")}
          checked={false}
          disabled
          value={value}
          uiParams={{
            options: [{
              text: "this is hello",
              value: "hello"
            }, {
              text: "this is world",
              value: "world"
            }]
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
        <StringCardDemo1/>
        <StringCardDemo2/>
      </React.Fragment>
    )
  }
}