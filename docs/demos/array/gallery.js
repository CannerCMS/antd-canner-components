// @flow
import * as React from 'react';
import Gallery from 'packages/antd-array-gallery';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {IntlProvider} from 'react-intl';
import transformData from '@canner/qa-generator/lib/utils/transformData'
import {Divider} from 'antd';

export default class GalleryDemo extends React.Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>
            Create default gallery
          </Divider>
          <Gallery
            value={immutable.fromJS([{
              image: "https://i.imgur.com/seGYsJW.jpg"
            }, {
              image: "https://i.imgur.com/sMsPiL9.jpg"
            }, {
              image: "https://i.imgur.com/seGYsJW.jpg"
            }, {
              image: "https://i.imgur.com/sMsPiL9.jpg"
            }, {
              image: "https://i.imgur.com/seGYsJW.jpg"
            }, {
              image: "https://i.imgur.com/sMsPiL9.jpg"
            }])}
            id="gallery"
            generateId={(id, i, type) => `${id}/${i}/${type}`}
            transformData={transformData}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}