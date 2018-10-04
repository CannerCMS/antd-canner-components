// @flow
import * as React from 'react';
import Editor from 'packages/antd-object-editor';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper({html: ''})
class EditorComponentDemo1 extends React.Component<PrimitiveTypes<boolean>> {

  render() {
    const {value, onChange} = this.props;

    return (
      <React.Fragment>
        <Divider>Editor</Divider>
        <Editor
          refId={new RefId("map")}
          value={value}
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
        <EditorComponentDemo1/>
      </React.Fragment>
    )
  }
}