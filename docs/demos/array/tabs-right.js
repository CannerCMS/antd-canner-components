// @flow
import React, {Component} from 'react';
import TabRight from 'packages/antd-array-tab-right';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';

export default class TabRightDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabRight
          value={immutable.fromJS([{
            "title": "title 1",
            "content": "content 1"
          }, {
            "title": "title 2",
            "content": "content 2"
          }])}
          refId={new RefId("tab-right")}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}