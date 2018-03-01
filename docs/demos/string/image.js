// @flow
import React, {Component, Fragment} from 'react';
import Image from 'packages/antd-string-image';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';

export default class ImageDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <Divider>Normal image with image</Divider>
          <Image
            id="image"
            value="https://cdn.canner.io/images/logo/logo-word.png"
            uiParams={{service: 'imgur'}}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />

          <Divider>Normal image uploader without selected image</Divider>
          <Image
            id="image"
            uiParams={{service: 'imgur'}}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled image uploader with image</Divider>
          <Image
            id="image"
            disabled
            value="https://cdn.canner.io/images/logo/logo-word.png"
            uiParams={{service: 'imgur'}}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
          <Divider>Disabled image uploader without image</Divider>
          <Image
            id="image"
            disabled
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