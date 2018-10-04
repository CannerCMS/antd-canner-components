// @flow
import * as React from 'react';
import IndicatorList from 'packages/antd-indicator-list';
import {Divider, Avatar} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper([
  {
    avatar: "https://cdn.canner.io/images/logo/logo-word.png",
    name: 'world1'
  },
  {
    avatar: "https://cdn.canner.io/images/logo/logo-word.png",
    name: 'world2'
  },
  {
    avatar: "https://cdn.canner.io/images/logo/logo-word.png",
    name: 'world3'
  }
])
class IndicatorListDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value}= this.props;
    return (
      <React.Fragment>
        <Divider>Indicator List</Divider>
        <IndicatorList
          refId={new RefId("indicator-list")}
          value={value}
          uiParams={{
            avatar: (value:any) => (<Avatar src={value.avatar} />),
            title: (value:any) => (<a href="https://ant.design">{value.name}</a>),
            description: () => ('Canner Indicator List Demo'),
            content: () => (<div>Content</div>)
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
        <IndicatorListDemo1/>
      </React.Fragment>
    )
  }
}