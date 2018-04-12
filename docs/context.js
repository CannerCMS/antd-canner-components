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
    onClick = () => message.success('confirm'),
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
    onClick = () => message.warning('Reset content'),
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
