// @flow
import * as React from 'react';
import SingleSelect from 'packages/antd-relation-single_select';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import RefId from 'canner-ref-id';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const connection = immutable.fromJS({
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
});

// $FlowFixMe
const value = connection.get('edges').map(edge => edge.get('node'));

@ExampleArrayValueWrapper(value)
class SingleSelectDemo extends React.Component<ArrayTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General single select - value using immutable list</Divider>
          <SingleSelect
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
              }]
            }}
            fetch={() => Promise.resolve(connection)}
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

export default SingleSelectDemo;
