// @flow
import * as React from 'react';
import MultiSelect from 'packages/antd-relation-multiple_select';
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
      title: 'item1'
    }
  }, {
    cursor: 'item2',
    node: {
      id: 'item2',
      title: 'item2'
    }
  }, {
    cursor: 'item3',
    node: {
      id: 'item3',
      title: 'item3'
    }
  }, {
    cursor: 'item4',
    node: {
      id: 'item4',
      title: 'item4'
    }
  }, {
    cursor: 'item5',
    node: {
      id: 'item5',
      title: 'item5'
    }
  }],
  pageInfo: {
    hasNextInfo: false
  }
};

// $FlowFixMe
const value = connection.edges.map(edge => edge.node);

@ExampleArrayValueWrapper(value)
class MultiSelectDemo extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General single select - value using array</Divider>
          <MultiSelect
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
              }]
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
            Toolbar={({children}) => React.cloneElement(children)}
            relationValue={connection}
            subscribe={() => ({unsubscribe: () => {}})}
            updateQuery={console.log}
            refId={new RefId("relation")}
            onChange={onChange}
          />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default MultiSelectDemo;
