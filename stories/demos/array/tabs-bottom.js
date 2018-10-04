// @flow
import React, {Component} from 'react';
import TabBottom from 'packages/antd-array-tab_bottom';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const initData = [{
  "title": "title 1",
  "content": "content 1"
}, {
  "title": "title 2",
  "content": "content 2"
}]

@ExampleArrayValueWrapper(initData)
export default class TabBottomDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabBottom
          value={value}
          refId={new RefId("tab-bottom")}
          onChange={onChange}
          />
      </IntlProvider>
    );
  }
}