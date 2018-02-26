// @flow
import React from 'react';
import Loadable from 'react-loadable';
import {Spin, Icon} from 'antd';
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin />;
function createLoadable(loader) {
  // eslint-disable-next-line
  return Loadable({
    loader,
    loading() {
      return <Spin indicator={antIcon} />;
    }
  });
}

export default {
  string: {
    input: createLoadable(() => import('@canner/cms-plugin-string-input')),
    image: createLoadable(() => import('@canner/cms-plugin-string-image')),
    textarea: createLoadable(() => import('@canner/cms-plugin-string-textarea'))
  },
  number: {
    input: createLoadable(() => import('@canner/cms-plugin-number-input'))
  },
  array: {
    tab: createLoadable(() => import('@canner/cms-plugin-array-tabs')),
    gallery: createLoadable(() => import('@canner/cms-plugin-array-gallery')),
    popup: createLoadable(() => import('@canner/cms-plugin-array-popup'))
  },
  object: {
    fieldset: createLoadable(() => import('@canner/cms-plugin-object-fieldset'))
  }
}
