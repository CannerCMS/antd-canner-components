// @flow
import React, {Component, Fragment} from 'react';
import Image from 'packages/antd-string-image';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';

export default class ImageDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <h1>Normal image</h1>
          <Image
            id="image"
            value="https://cdn.canner.io/images/logo/logo-word.png"
            uiParams={{service: 'imgur'}}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />

          <h1>Normal image uploader with no selected image</h1>
          <Image
            id="image"
            uiParams={{service: 'imgur'}}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}