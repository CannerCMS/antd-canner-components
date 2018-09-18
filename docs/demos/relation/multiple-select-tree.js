// @flow
import * as React from 'react';
import MultiSelectTree from 'packages/antd-relation-multiple_select_tree';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const connection = {
  edges: [{
    cursor: 'item1',
    node: {
      id: 'item1',
      title: 'item1',
      relation: null
    }
  }, {
    cursor: 'item2',
    node: {
      id: 'item2',
      title: 'item2',
      relation: {
        id: 'item1'
      }
    }
  }, {
    cursor: 'item3',
    node: {
      id: 'item3',
      title: 'item3',
      relation: {
        id: 'item2'
      }
    }
  }, {
    cursor: 'item4',
    node: {
      id: 'item4',
      title: 'item4',
      relation: null
    }
  }, {
    cursor: 'item5',
    node: {
      id: 'item5',
      title: 'item5',
      relation: {
        id: 'item4'
      }
    }
  }],
  pageInfo: {
    hasNextInfo: false
  }
};

// $FlowFixMe
const dataList = connection.edges.map(edge => edge.node);

@ExampleArrayValueWrapper(dataList)
class MultiSelectDemo extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General single select - value using array</Divider>
          <MultiSelectTree
            value={value}
            relation={{
              to: 'posts',
              type: 'toMany'
            }}
            uiParams={{
              textCol: 'title',
              columns: [{
                title: 'Title',
                dataIndex: 'title'
              }],
              relationField: 'relation'
            }}
            schema={{posts: {
              title: 'posts',
              type: 'array',
              items: {
                type: 'object',
                items: {
                  title: {
                    type: 'string'
                  }
                }
              }
            }}}
            toolbar={{
              actions: {
                filterButton: true
              },
              filter: {
                permanentFilter: () => {
                  return {
                  };
                },
                filters: [{
                  type: 'text',
                  label: 'text',
                  field: 'title'
                }]
              }
            }}
            rootValue={{relation: dataList}}
            Toolbar={({children}) => children(dataList)}
            relationValue={connection}
            refId={new RefId("relation/1/relation")}
            onChange={onChange}
          />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default MultiSelectDemo;
