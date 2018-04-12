// @flow
import React, {Component, Fragment} from 'react';
import Link from 'packages/antd-string-link';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../PrimitiveTypes';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper('this is link value')
class LinkDemo1 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>General link</Divider>
          <Link
            refId={new RefId("link")}
            value={value}
            onChange={onChange}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}

@ExamplePrimitiveValueWrapper('this is link value')
class LinkDemo2 extends Component<PrimitiveTypes<string>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>Disabled link</Divider>
          <Link
            refId={new RefId("link")}
            value={value}
            disabled
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
        <LinkDemo1/>
        <LinkDemo2/>
      </Fragment>
    )
  }
}