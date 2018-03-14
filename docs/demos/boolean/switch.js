// @flow
import React, {Component, Fragment} from 'react';
import BooleanSwitch from 'packages/antd-boolean-switch';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';

@ExamplePrimitiveValueWrapper(true)
class BooleanSwitchDemo1 extends Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>Boolean switch</Divider>
          <BooleanSwitch
            id="boolean-switch"
            value={value}
            uiParams={{
              yesText: "YES!!",
              noText: "NO!!"
            }}
            onChange={onChange}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}


@ExamplePrimitiveValueWrapper(true)
class BooleanSwitchDemo2 extends Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>Disabled boolean switch</Divider>
          <BooleanSwitch
            id="boolean-switch"
            disabled
            value={value}
            uiParams={{
              yesText: "YES!!",
              noText: "NO!!"
            }}
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
        <BooleanSwitchDemo1/>
        <BooleanSwitchDemo2/>
      </Fragment>
    )
  }
}