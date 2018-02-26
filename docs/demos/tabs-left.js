// @flow
import React, {Component} from 'react';
import TabTop from 'packages/antd-array-tabs';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';

export default class TabTopDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider local="en">
        <TabTop
          value={immutable.fromJS([{
            "title": "title 1",
            "content": "content 1"
          }, {
            "title": "title 2",
            "content": "content 2"
          }])}
          />
      </IntlProvider>
    );
  }
}