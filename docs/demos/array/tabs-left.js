// @flow
import React, {Component} from 'react';
import TabLeft from 'packages/antd-array-tab-left';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExampleArrayValueHoc';
import type {ArrayTypes} from '../types';

const initData = [{
  "title": "title 1",
  "content": "content 1"
}, {
  "title": "title 2",
  "content": "content 2"
}]

@ExampleArrayValueWrapper(immutable.List(initData))
export default class TabLeftDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabLeft
          value={value}
          refId={new RefId("tab-left")}
          onChange={onChange}
          />
      </IntlProvider>
    );
  }
}