// @flow
import React, {Component, Fragment} from 'react';
import TimePicker from 'packages/antd-string-time-picker';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';

@ExamplePrimitiveValueWrapper("16:18")
class TimePickerDemo1 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>General</Divider>
          <TimePicker
            id="input"
            value={value}
            onChange={onChange}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}


@ExamplePrimitiveValueWrapper("12:00")
class TimePickerDemo2 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>Disabled</Divider>
          <TimePicker
            disabled={true}
            id="input"
            value={value}
            onChange={onChange}
          />
        </Fragment>
      </IntlProvider>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <TimePickerDemo1/>
        <TimePickerDemo2/>
      </Fragment>
    )
  }
}