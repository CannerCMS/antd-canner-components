// @flow
import * as React from 'react';
import Tag from 'packages/antd-array-tag';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

@ExampleArrayValueWrapper(immutable.List(["tag 1", "tag 2"]))
class TagDemo1 extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General tag - value using immutable list</Divider>
          <Tag
            value={value}
            refId={new RefId("tag")}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

@ExampleArrayValueWrapper(["tag 1", "tag 2"])
class TagDemo2 extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General tag - value using array</Divider>
          <Tag
            value={value}
            refId={new RefId("tag")}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

@ExampleArrayValueWrapper()
class TagDemo3 extends React.Component<ArrayTypes<any>> {
  render() {
    const {onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Disabled - general tag</Divider>
          <Tag
            value={["tag 1", "tag 2"]}
            disabled
            refId={new RefId("tag")}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <TagDemo1/>
        <TagDemo2/>
        <TagDemo3/>
      </React.Fragment>
    );
  }
}