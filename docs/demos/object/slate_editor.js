// @flow
import * as React from 'react';
import Editor from 'packages/antd-object-slate_editor';
import {Divider, Button} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper({state: JSON.stringify({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              }
            ],
          },
        ],
      },
    ],
  },
})})
class EditorComponentDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  onDeploy = (callback) => {
    this.cb = callback;
  }

  callback = () => {
    console.log(this.cb());
  }

  render() {
    const {value, onChange} = this.props;

    return (
      <React.Fragment>
        <Divider>Slate</Divider>
        <Editor
          onDeploy={this.onDeploy}
          refId={new RefId("map")}
          value={value}
          onChange={onChange}
        />
        <Button onClick={this.callback}>Deploy</Button>
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