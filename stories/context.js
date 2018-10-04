// @flow

import React from 'react';
import {Button, message, Alert} from 'antd';
import RefId from 'canner-ref-id';

export default function (items: any) {
  return {
    renderChildren: (props: any) => {
      if (typeof props === 'function') {
        return (
          <div style={{marginTop: '20px'}}>
            {Object.keys(items).map(itemKey => {
              const childrenProps = props(items[itemKey]);

              if (childrenProps.hidden)
                return <Alert key={itemKey} message={`${childrenProps.refId.toString()} ${itemKey} is hidden.`} type="warning"/>;
              return <Alert key={itemKey} message={`render ${childrenProps.refId.toString()} ${itemKey} is show.`}type="success"/>;
            })
            }
          </div>
        );
      } else {
        return `render ${props.refId.toString()}`;
      }
    },
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
};