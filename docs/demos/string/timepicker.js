// @flow
import React, {Component, Fragment} from 'react';
import TimePicker from 'packages/antd-string-time-picker';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';

export default class TimePickerDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>General</Divider>
          <TimePicker
            id="input"
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          
          <Divider>Disabled</Divider>
          <TimePicker
            disabled={true}
            id="input"
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
          />
        </Fragment>
      </IntlProvider>
    );
  }
}