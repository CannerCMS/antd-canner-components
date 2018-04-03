// @flow
import * as React from 'react';
import Gallery from 'packages/antd-array-gallery';
import cmsLocale from 'packages/antd-locales';
import immutable from 'immutable';
import {ImgurService} from "@canner/image-service-config";
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
              image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2ba0ce35b750cf280ed5319c07ae13c&auto=format&fit=crop&w=3150&q=80"
            }, {
              image: "https://images.unsplash.com/photo-1522204507765-be33852f2e28?ixlib=rb-0.3.5&s=5ed399c55beb5bee7ac055a3d946bb20&auto=format&fit=crop&w=3334&q=80"
            }, {
              image: "https://images.unsplash.com/photo-1522204657746-fccce0824cfd?ixlib=rb-0.3.5&s=ddc8760689fba9224d60fc5a1b031506&auto=format&fit=crop&w=3150&q=80"
            }, {
              image: "https://images.unsplash.com/photo-1522206024047-9c925421675b?ixlib=rb-0.3.5&s=7c43b852552a84227da908450ad2e863&auto=format&fit=crop&w=3334&q=80"
            }, {
              image: "https://images.unsplash.com/photo-1522204538344-922f76ecc041?ixlib=rb-0.3.5&s=3da2ab8a5e8136df153b26822f1c5192&auto=format&fit=crop&w=3151&q=80"
            }, {
              image: "https://images.unsplash.com/photo-1522205432273-e6a178a9edd2?ixlib=rb-0.3.5&s=24dfd46e1b916c0a3d5644b23a782a75&auto=format&fit=crop&w=3300&q=80"
            }])}
            id="gallery"
            generateId={(id, i, type) => `${id}/${i}/${type}`}
            transformData={transformData}
            imageServiceConfig={new ImgurService({
              mashapeKey: '<mashapeKey>',
              clientId: '<clientId>'
            })}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}