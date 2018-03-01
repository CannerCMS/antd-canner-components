// @flow
import React, {Component, Fragment} from 'react';
import Datetime from 'packages/antd-string-date-time-picker';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';

export default class DatetimeDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>General date time picker</Divider>
          <Datetime
            id="input"
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled time picker</Divider>
          <Datetime
            id="input"
            disabled
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}