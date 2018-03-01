// @flow
import * as React from 'react';
import NumberRate from 'packages/antd-number-rate';

export default class NumberRateDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Number rate</h1>
        <NumberRate
          id="number-rate"
          value={2.5}
          uiParams={{
            allowHalf: true
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}