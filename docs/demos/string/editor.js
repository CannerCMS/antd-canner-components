// @flow
import React, {Component, Fragment} from 'react';
import Editor from 'packages/antd-string-editor';
import {Divider} from 'antd';

export default class EditorDemo extends Component<{}> {
  render() {
    return (
      <Fragment>
        <Divider>General editor</Divider>
        <Editor
          id="editor"
          value="This is a editor"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <Divider>Disabled general editor</Divider>
        <Editor
          id="editor"
          disabled
          value="This is a editor"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </Fragment>
    );
  }
}