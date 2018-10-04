// @flow
import * as React from 'react';
import SingleSelectTree from 'packages/antd-relation-single_select_tree';
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

@ExampleArrayValueWrapper(dataList[0])
class SingleSelectTreeDemo extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General single select - value using array</Divider>
          <SingleSelectTree
            value={value}
            relation={{
              to: 'posts',
              type: 'toOne'
            }}
            uiParams={{
              textCol: 'title',
              columns: [{
                title: 'Title',
                dataIndex: 'title'
              }],
              relationField: 'relation'
            }}
            toolbar={{
              actions: {
                filterButton: true
              },
              filter: {
                filters: [{
                  type: 'text',
                  label: 'text',
                  field: 'title'
                }]
              }
            }}
            subscribe={() => ({unsubscribe: () => {}})}
            updateQuery={console.log}
            refId={new RefId("relation/0/relation")}
            relationValue={connection}
            Toolbar={({children}) => children(dataList)}
            rootValue={{relation: dataList}}
            onChange={onChange}
          />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default SingleSelectTreeDemo;
