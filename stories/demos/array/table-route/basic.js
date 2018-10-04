// @flow
import React, {Component} from 'react';
import Table from 'packages/antd-array-table_route';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../../types';

const initData = [{
  id: 'id1',
  "title": "title 1",
  "content": "content 1"
}, {
  id: 'id2',
  "title": "title 2",
  "content": "content 2"
}]

@ExampleArrayValueWrapper(initData)
export default class TableRouteDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Table
          value={value}
          refId={new RefId("table-route")}
          goTo={(route, params) => console.log('goto: ', route, params)}
          uiParams={{
            columns: [{
              title: "title",
              key: "title",
              dataIndex: "title"
            }]
          }}
          items={{
            type: "object",
            items: {
              title: {
                type: "string"
              },
              content: {
                type: "string"
              }
            }
          }}
          onChange={onChange}
          />
      </IntlProvider>
    );
  }
}