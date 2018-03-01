// @flow
import * as React from 'react';
import NumberInput from 'packages/antd-number-input';
import {Divider} from 'antd';

export default class NumberInputDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>Number input</Divider>
        <NumberInput
          id="number-input"
          value={6}
          uiParams={{
            min: 1,
            max: 10,
            step: 2,
            unit: " unit"
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />

        <Divider>Disabled number input</Divider>
        <NumberInput
          id="number-input"
          disabled
          value={6}
          uiParams={{
            min: 1,
            max: 10,
            step: 2,
            unit: " unit"
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}