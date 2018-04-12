// @flow
import React, {Component} from 'react';
import TabLeft from 'packages/antd-array-tab-left';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';

export default class TabLeftDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <TabLeft
          value={immutable.fromJS([{
            "title": "title 1",
            "content": "content 1"
          }, {
            "title": "title 2",
            "content": "content 2"
          }])}
          refId={new RefId("tab-left")}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}