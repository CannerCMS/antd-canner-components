// @flow
import React, {Component, Fragment} from 'react';
import TimePicker from 'packages/antd-string-time-picker';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';

export default class TimePickerDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <h1>Normal time picker</h1>
          <TimePicker
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