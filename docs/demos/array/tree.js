// @flow
import React, {Component} from 'react';
import Tree from 'packages/antd-array-tree';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const initData = [{
  id: 'id1',
  title: 'Title1',
  ref: {id:'id2'}
}, {
  id: 'id2',
  title: 'Title2',
  ref: null
}, {
  id: 'id3',
  title: 'Title3',
  ref: {id: 'id4'}
}, {
  id: 'id4',
  title: 'Title4',
  ref: null
}]

@ExampleArrayValueWrapper(initData)
export default class TreeDemo extends Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Tree
          title="tree"
          updateQuery={() => {}}
          value={value}
          refId={new RefId("tree")}
          uiParams={{
            textCol: 'title',
            relationField: 'ref'
          }}
          toolbar={{
            actions: {
              filterButton: true
            },
            filter: {
              filters: [{
                label: "status",
                type: 'select',
                options: [{
                  text: 'contain title',
                  condition: {
                    title: {
                      contains: 'title'
                    }
                  }
                }, {
                  text: 'contain name',
                  condition: {
                    title: {
                      contains: 'name'
                    }
                  }
                }]
              }]
            }
          }}
          items={{
            type: "object",
            items: {
              ref: {
                type: "relation",
                relation: {
                  to: 'tree',
                  type: 'toOne'
                }
              },
              title: {
                type: "string"
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