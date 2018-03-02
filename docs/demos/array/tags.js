// @flow
import * as React from 'react';
import Tag from 'packages/antd-array-tag';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import transformData from '@canner/qa-generator/lib/utils/transformData'
import {Divider} from 'antd';

export default class TagDemo extends React.Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>General tag - value using immutable list</Divider>
          <Tag
            value={immutable.fromJS(["tag 1", "tag 2"])}
            id="tag"
            generateId={(id, i, type) => `${id}/${i}/${type}`}
            transformData={transformData}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>General tag - value using array</Divider>
          <Tag
            value={["tag 1", "tag 2"]}
            id="tag"
            generateId={(id, i, type) => `${id}/${i}/${type}`}
            transformData={transformData}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled - general tag</Divider>
          <Tag
            value={["tag 1", "tag 2"]}
            disabled
            id="tag"
            generateId={(id, i, type) => `${id}/${i}/${type}`}
            transformData={transformData}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}