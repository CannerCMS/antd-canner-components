// @flow
import * as React from 'react';
import Textarea from 'packages/antd-string-textarea';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper("this is textarea value")
class TextareaDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>General textarea</Divider>
        <Textarea
          refId={new RefId("textarea")}
          value={value}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

class TextareaDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled textarea</Divider>
        <Textarea
          refId={new RefId("textarea")}
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
        <TextareaDemo1/>
        <TextareaDemo2/>
      </React.Fragment>
    )
  }
}