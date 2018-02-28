// @flow
import React, {Component, Fragment} from 'react';
import Link from 'packages/antd-string-link';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';

export default class LinkDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <h1>Normal link</h1>
          <Link
            id="link"
            value="this is link value"
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}