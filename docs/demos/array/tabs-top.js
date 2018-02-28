// @flow
import React, {Component} from 'react';
import TabTop from 'packages/antd-array-tabs';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import createEmptyData from '@canner/qa-generator/lib/utils/createEmptyData'

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
          renderChildren={(values) => `this is content: ${values.id}`}
          createEmptyData={createEmptyData}
          items={{}}
          onChange={(datum, evt) => console.log(datum, evt)}
          />
      </IntlProvider>
    );
  }
}