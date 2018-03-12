// @flow
import React, {Component, Fragment} from 'react';
import Editor from 'packages/antd-string-editor';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';

@ExamplePrimitiveValueWrapper("This is an editor")
class EditorDemo1 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <Fragment>
        <Divider>General editor</Divider>
        <Editor
          id="editor"
          value={value}
          onChange={onChange}
          />
      </Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper("This is an editor")
class EditorDemo2 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <Fragment>
        <Divider>Disabled general editor</Divider>
        <Editor
          id="editor"
          disabled
          value={value}
          onChange={onChange}
          />
      </Fragment>
    )
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <EditorDemo1/>
        <EditorDemo2/>
      </Fragment>
    )
  }
}