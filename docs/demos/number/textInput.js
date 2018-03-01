// @flow
import * as React from 'react';
import NumberInput from 'packages/antd-number-text-input';

export default class NumberInputDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Number input</h1>
        <NumberInput
          id="number-text-input"
          value={6}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}