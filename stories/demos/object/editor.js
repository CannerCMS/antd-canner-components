// @flow
import * as React from 'react';
import Editor from 'packages/antd-object-editor';
import {Divider, Button} from 'antd';
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

@ExamplePrimitiveValueWrapper({html: ''})
class EditorComponentDemo2 extends React.Component<PrimitiveTypes<boolean>> {
  constructor(props: Object) {
    super(props);
    this.state = {
      toggle: false,
      updateValue: {html: "<h2>Updated!</h2>"}
    }
  }

  swap = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  handleChange = (refId, update, delta) => {
    this.setState({
      updateValue: {
        html: delta
      }
    });
  }

  render() {
    const {value, onChange} = this.props;
    const {toggle, updateValue} = this.state;
    return (
      <React.Fragment>
        <Divider>Editor Should Update (Simulate Swapping in Tabs)</Divider>
        <Button onClick={this.swap} style={{marginBottom: 16}}>Simulate Swap</Button>
        <Editor
          refId={new RefId("map")}
          value={toggle ? value : updateValue}
          onChange={toggle ? onChange: this.handleChange}
        />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper({html: ''})
class EditorComponentDemo3 extends React.Component<PrimitiveTypes<boolean>> {

  render() {
    const {value, onChange} = this.props;

    return (
      <React.Fragment>
        <Divider>Disabled Editor</Divider>
        <Editor
          refId={new RefId("map")}
          value={value}
          onChange={onChange}
          disabled
        />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper({html: ''})
class EditorComponentDemo4 extends React.Component<PrimitiveTypes<boolean>> {

  render() {
    const {value, onChange} = this.props;

    return (
      <React.Fragment>
        <Divider>UIParams.minHeight = 100vh Editor</Divider>
        <Editor
          refId={new RefId("map")}
          value={value}
          onChange={onChange}
          uiParams={{
            minHeight: '100vh'
          }}
        />
      </React.Fragment>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <EditorComponentDemo1 />
        <EditorComponentDemo2 />
        <EditorComponentDemo3 />
        <EditorComponentDemo4 />
      </React.Fragment>
    )
  }
}