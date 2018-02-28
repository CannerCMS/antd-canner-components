// @flow
import React, {Component} from 'react';
import StringCard from 'packages/antd-string-card';

export default class StringCardDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>String card</h1>
        <StringCard
          id="string-card"
          checked={false}
          value="world"
          uiParams={{
            options: [{
              text: "this is hello",
              value: "hello"
            }, {
              text: "this is world",
              value: "world"
            }]
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}