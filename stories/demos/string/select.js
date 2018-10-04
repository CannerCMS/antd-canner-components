// @flow
import * as React from 'react';
import StringSelect from 'packages/antd-string-select';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper("2")
class SelectDemo1 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Select with value</Divider>
          <StringSelect
            refId={new RefId("select")}
            uiParams={{
              options: [{
                text: 'option 1',
                value: "1"
              }, {
                text: 'option 2',
                value: "2"
              }]
            }}
            value={value}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

@ExamplePrimitiveValueWrapper()
class SelectDemo2 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Select with default value</Divider>
          <StringSelect
            refId={new RefId("select")}
            value={value}
            uiParams={{
              options: [{
                text: 'option 1',
                value: "value 1"
              }, {
                text: 'option 2',
                value: "value 2"
              }],
              defaultSelected: 1
            }}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

@ExamplePrimitiveValueWrapper()
class SelectDemo3 extends React.Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Disabled select</Divider>
          <StringSelect
            refId={new RefId("select")}
            disabled
            value={value}
            uiParams={{
              options: [{
                text: 'option 1',
                value: "value 1"
              }, {
                text: 'option 2',
                value: "value 2"
              }],
              defaultSelected: 1
            }}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <SelectDemo1/>
        <SelectDemo2/>
        <SelectDemo3/>
      </React.Fragment>
    )
  }
}