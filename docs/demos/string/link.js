// @flow
import React, {Component, Fragment} from 'react';
import Link from 'packages/antd-string-link';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';

export default class LinkDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>General link</Divider>
          <Link
            id="link"
            value="this is link value"
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled link</Divider>
          <Link
            id="link"
            value="this is link value"
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