// @flow
import React, {Component, Fragment} from 'react';
import Datetime from 'packages/antd-string-date-time-picker';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';

export default class DatetimeDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <h1>Normal date time picker</h1>
          <Datetime
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