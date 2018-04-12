// @flow
import React, {Component} from 'react';
import TabTop from 'packages/antd-array-tabs';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';

export default class TabTopDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabTop
          value={immutable.fromJS([{
            "title": "title 1",
            "content": "content 1"
          }, {
            "title": "title 2",
            "content": "content 2"
          }])}
          refId={new RefId("tab-left")}
          items={{}}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}