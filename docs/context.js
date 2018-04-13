// @flow

import React from 'react';
import {Button, message} from 'antd';
import RefId from 'canner-ref-id';

export default {
  renderChildren: (i: any) => `this is the content ${i.refId.toString()}`,
  renderConfirmButton: function ConfirmButton({
    disabled = false,
    style = {marginRight: '10px'},
    refId = new RefId(""),
    onClick = (refId, cb) => {
      message.success('confirm');
      cb();
    },
    callback = () => {},
    // $FlowFixMe
    text = 'Confirm',
    // $FlowFixMe
    component = Button
  }: Object = {}) {
    return React.createElement(component, {
      disabled,
      style,
      type: "primary",
      onClick: () => onClick(refId, callback)
    }, text);
  },
  renderCancelButton: function CancelButton({
    disabled = false,
    style = {},
    refId = new RefId(""),
    onClick = (refId, cb) => {
      message.warning('Reset content');
      cb();
    },
    callback = () => {},
    // $FlowFixMe
    text = 'Reset',
    // $FlowFixMe
    component = Button
  }: Object = {}) {
    return React.createElement(component, {
      disabled,
      style,
      type: "default",
      onClick: () => onClick(refId, callback)
    }, text);
  },
  renderComponent: (refId: RefId) => `this is the component at '${refId.toString()}'`,
  refId: new RefId(""),
  routes: [],
};
