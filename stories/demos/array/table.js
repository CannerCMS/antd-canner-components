// @flow
import React, {Component} from 'react';
import Table from 'packages/antd-array-table';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const initData = [{
  "title": "title 1",
  "content": "content 1",
  "image": {
    url: "https://placeimg.com/321/321",
  },
  "photos": [{
    image: {
      "url": "https://placeimg.com/321/321"
    }
  }]
}, {
  "title": "title 2",
  "content": "content 2",
  "image": {
    url: "https://placeimg.com/321/321",
  },
  "photos": [{
    image: {
      "url": "https://placeimg.com/321/321"
    }
  }]
}]

@ExampleArrayValueWrapper(initData)
export default class TableDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Table
          value={value}
          refId={new RefId("table")}
          uiParams={{
            columns: [{
              title: "title",
              key: "title",
              dataIndex: "title"
            }, {
              title: "photos",
              key: "photos",
              dataIndex: "photos"
            }, {
              title: "image",
              key: "image",
              dataIndex: "image"
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
              },
              image: {
                type: "image"
              },
              photos: {
                type: "array",
                ui: "gallery",
                items: {
                  image: {
                    type: "object",
                    items: {
                      url: "string"
                    }
                  }
                }
              }
            }
          }}
          onChange={onChange}
          reset={() => {}}
          />
      </IntlProvider>
    );
  }
}