// @flow
import * as React from 'react';
import ShareCard from 'packages/antd-share-card';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';

@ExamplePrimitiveValueWrapper("hello")
class ShareCardDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>share card - not selected</Divider>
        <ShareCard
          checked={false}
          value={value}
          text="this is hello"
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper("hello")
class ShareCardDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>share card - selected</Divider>
        <ShareCard
          checked={true}
          value={value}
          text="this is hello"
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper("hello")
class ShareCardDemo3 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled share card - not selected</Divider>
        <ShareCard
          checked={false}
          disabled
          value={value}
          text="this is hello"
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

@ExamplePrimitiveValueWrapper("hello")
class ShareCardDemo4 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <React.Fragment>
        <Divider>Disabled share card - selected</Divider>
        <ShareCard
          checked={true}
          disabled
          value={value}
          text="this is hello"
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
        <ShareCardDemo1/>
        <ShareCardDemo2/>
        <ShareCardDemo3/>
        <ShareCardDemo4/>
      </React.Fragment>
    )
  }
}