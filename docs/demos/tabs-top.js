// @flow
import React, {Component} from 'react';
import TabTop from 'packages/antd-array-tabs/src';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';

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
          id="tab-left"
          generateId={(id, i, type) => `${id}/${i}/${type}`}
          renderChildren={() => "this is content"}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}