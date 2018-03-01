// @flow
import * as React from 'react';
import NumberSlider from 'packages/antd-number-slider';

export default class NumberSliderDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Number slider</h1>
        <NumberSlider
          id="number-slider"
          value={6}
          uiParams={{
            min: 2,
            max: 10,
            step: 2,
            unit: "unit"
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}