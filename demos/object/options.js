// @flow
import * as React from 'react';
import Options from 'packages/antd-object-options';
import {fromJS} from 'immutable';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';
import {Context} from '@canner/react-cms-helpers';
import contextValue from '../../context';

@ExamplePrimitiveValueWrapper(fromJS({
  selectedKey: "option1",
  option1: {
    title: "this is title 1"
  },
  option2: {
    content: "this is content 2"
  }
}))
class OptionsDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    const items = {
      option1: {
        type: "string",
        keyName: "option1"
      },
      option2: {
        keyName: "option2",
        type: "string",
        ui: "editor"
      }
    };

    return (
      <Context.Provider value={contextValue(items)}>
        <Divider>Object option switch</Divider>
        <Options
          refId={new RefId("option-switch")}
          value={value}
          uiParams={{
            options: [{
              title: 'Option1',
              key: 'option1'
            }, {
              title: 'Option2',
              key: 'option2'
            }],
            optionKey: 'selectedKey'
          }}
          items={items}
          onChange={onChange}
          />
      </Context.Provider>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <OptionsDemo1/>
      </React.Fragment>
    )
  }
}