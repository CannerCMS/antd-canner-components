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

let list = immutable.fromJS([{
  _id: 'item1',
  title: 'item1'
}, {
  _id: 'item2',
  title: 'item2'
}, {
  _id: 'item3',
  title: 'item3'
}, {
  _id: 'item4',
  title: 'item4'
}, {
  _id: 'item5',
  title: 'item5'
}]);

const rtnCtx = {
  response: {
    pagination: {
      goTo: () => {
        return {}
      },
      totalPage: 1,
      page: 1,
    },
    body: list
  }
}

@ExampleArrayValueWrapper(list)
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
              relationTo: 'posts'
            }}
            uiParams={{
              textCol: 'title',
              columns: [{
                title: 'Title',
                dataIndex: 'title'
              }]
            }}
            fetch={() => Promise.resolve(rtnCtx)}
            refId={new RefId("relation")}
            onChange={onChange}
          />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default SingleSelectDemo;
