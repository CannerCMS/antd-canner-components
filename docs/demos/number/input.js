// @flow
import * as React from 'react';
import NumberInput from 'packages/antd-number-input';

export default class NumberInputDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Number input</h1>
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
      </React.Fragment>
    );
  }
}