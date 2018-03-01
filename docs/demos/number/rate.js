// @flow
import * as React from 'react';
import NumberRate from 'packages/antd-number-rate';
import {Divider} from 'antd';

export default class NumberRateDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>Number rate</Divider>
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

        <Divider>Disabled number rate</Divider>
        <NumberRate
          id="number-rate"
          disabled
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