// @flow
import * as React from 'react';
import Gallery from 'packages/antd-array-gallery';
import cmsLocale from 'packages/antd-locales';
import {ImgurStorage} from "canner-storage";
import RefId from 'canner-ref-id';
import {IntlProvider} from 'react-intl';
import {Divider} from 'antd';
import ExampleArrayValueWrapper from '../ExamplePrimitiveValueHoc';
import type {ArrayTypes} from '../types';

const initData = [{
  image: {
    url: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2ba0ce35b750cf280ed5319c07ae13c&auto=format&fit=crop&w=3150&q=80"
  }
}, {
  image: {
    url: "https://images.unsplash.com/photo-1522204507765-be33852f2e28?ixlib=rb-0.3.5&s=5ed399c55beb5bee7ac055a3d946bb20&auto=format&fit=crop&w=3334&q=80"
  }
}, {
  image: {
    url: "https://images.unsplash.com/photo-1522204657746-fccce0824cfd?ixlib=rb-0.3.5&s=ddc8760689fba9224d60fc5a1b031506&auto=format&fit=crop&w=3150&q=80"
  }
}, {
  image: {
    url: "https://images.unsplash.com/photo-1522206024047-9c925421675b?ixlib=rb-0.3.5&s=7c43b852552a84227da908450ad2e863&auto=format&fit=crop&w=3334&q=80"
  }
}]

@ExampleArrayValueWrapper(initData)
export default class GalleryDemo extends React.Component<ArrayTypes<any>> {
  render() {
    const {value, onChange} = this.props;
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>
            Create default gallery
          </Divider>
          <Gallery
            value={value}
            refId={new RefId("gallery")}
            imageStorage={new ImgurStorage({
              mashapeKey: '<mashapeKey>',
              clientId: '<clientId>'
            })}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}