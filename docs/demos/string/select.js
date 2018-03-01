// @flow
import * as React from 'react';
import StringSelect from 'packages/antd-string-select';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';

export default class SelectDemo extends React.Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Select with value</Divider>
          <StringSelect
            id="select"
            uiParams={{
              options: [{
                text: 'option 1',
                value: "1"
              }, {
                text: 'option 2',
                value: "2"
              }]
            }}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Select with default value</Divider>
          <StringSelect
            id="select"
            uiParams={{
              options: [{
                text: 'option 1',
                value: "1"
              }, {
                text: 'option 2',
                value: "2"
              }],
              defaultSelected: 1
            }}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled select</Divider>
          <StringSelect
            id="select"
            disabled
            uiParams={{
              options: [{
                text: 'option 1',
                value: "1"
              }, {
                text: 'option 2',
                value: "2"
              }],
              defaultSelected: 1
            }}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}