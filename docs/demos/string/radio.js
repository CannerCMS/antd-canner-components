// @flow
import * as React from 'react';
import StringRadio from 'packages/antd-string-radio';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper("1")
class RadioDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props
    return (
      <React.Fragment>
        <Divider>General radio</Divider>
        <StringRadio
          refId={new RefId("radio")}
          value={value}
          uiParams={{
            options: [{
              text: 'option 1',
              value: "value 1"
            }, {
              text: 'option 2',
              value: "value 2"
            }],
            defaultSelected: 1
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper()
class RadioDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>radio with default value</Divider>
        <StringRadio
          refId={new RefId("radio")}
          value={value}
          uiParams={{
            options: [{
              text: 'option 1',
              value: "value 1"
            }, {
              text: 'option 2',
              value: "value 2"
            }],
            defaultSelected: 1
          }}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper("1")
class RadioDemo3 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled radio</Divider>
        <StringRadio
          refId={new RefId("radio")}
          value={value}
          disabled
          uiParams={{
            options: [{
              text: 'option 1',
              value: "1"
            }, {
              text: 'option 2',
              value: "2"
            }],
            defaultSelected: 1
          }}
          onChange={onChange}
          />
      </React.Fragment>
    )
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <RadioDemo1/>
        <RadioDemo2/>
        <RadioDemo3/>
      </React.Fragment>
    )
  }
}