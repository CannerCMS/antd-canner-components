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
    card: createLoadable(() => import('@canner/cms-plugin-string-card')),
    dateTime: createLoadable(() => import('@canner/cms-plugin-string-date-time-picker')),
    editor: createLoadable(() => import('@canner/cms-plugin-string-editor')),
    link: createLoadable(() => import('@canner/cms-plugin-string-link')),
    radio: createLoadable(() => import('@canner/cms-plugin-string-radio')),
    select: createLoadable(() => import('@canner/cms-plugin-string-select')),
    textarea: createLoadable(() => import('@canner/cms-plugin-string-textarea')),
    time: createLoadable(() => import('@canner/cms-plugin-string-time-picker'))
  },
  number: {
    input: createLoadable(() => import('@canner/cms-plugin-number-input')),
    rate: createLoadable(() => import('@canner/cms-plugin-number-rate')),
    slider: createLoadable(() => import('@canner/cms-plugin-number-slider')),
    numberInput: createLoadable(() => import('@canner/cms-plugin-number-text-input'))
  },
  array: {
    tab: createLoadable(() => import('@canner/cms-plugin-array-tabs')),
    gallery: createLoadable(() => import('@canner/cms-plugin-array-gallery')),
    popup: createLoadable(() => import('@canner/cms-plugin-array-popup')),
    slider: createLoadable(() => import('@canner/cms-plugin-array-slider')),
    panel: createLoadable(() => import('@canner/cms-plugin-array-panel')),
    tag: createLoadable(() => import('@canner/cms-plugin-array-tag'))
  },
  object: {
    fieldset: createLoadable(() => import('@canner/cms-plugin-object-fieldset')),
    map: createLoadable(() => import('@canner/cms-plugin-object-map')),
    variants: createLoadable(() => import('@canner/cms-plugin-object-variants'))
  },
  relation: {
    one: createLoadable(() => import('@canner/cms-plugin-relation/lib/One')),
    list: createLoadable(() => import('@canner/cms-plugin-relation/lib/List'))
  }
}
