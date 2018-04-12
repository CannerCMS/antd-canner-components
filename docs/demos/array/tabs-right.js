// @flow
import React, {Component} from 'react';
import TabRight from 'packages/antd-array-tab-right';
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
export default class TabRightDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabRight
          value={value}
          refId={new RefId("tab-right")}
          onChange={onChange}
          />
      </IntlProvider>
    );
  }
}