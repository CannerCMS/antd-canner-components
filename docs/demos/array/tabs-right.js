// @flow
import React, {Component} from 'react';
import TabRight from 'packages/antd-array-tab-right';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';

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
          id="tab-right"
          generateId={(id, i, type) => `${id}/${i}/${type}`}
          renderChildren={() => "this is content"}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}