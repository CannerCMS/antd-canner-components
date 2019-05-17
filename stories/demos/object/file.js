//@flow
import React from 'react';
import {Divider} from 'antd';
import File from 'packages/antd-object-file';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

const defaultValue = {
  contentType: "video/mp4",
  name: "cool.mp4",
  size: 1233,
  url: "https://mp4.com/cool.mp4"
};

@ExamplePrimitiveValueWrapper(defaultValue)
class ImageDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const { value, onChange } = this.props;
    return (
      <React.Fragment>
        <Divider>Normal file with file</Divider>
        <File
          refId={new RefId("file")}
          value={value}
          uiParams={{service: 'firebase'}}
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
        <ImageDemo1/>
      </React.Fragment>
    );
  }
}
