// @flow
import * as React from 'react';
import StringCard from 'packages/antd-string-card';
import {Divider} from 'antd';

export default class StringCardDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>String card</Divider>
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
        <Divider>Disabled string card</Divider>
        <StringCard
          id="string-card"
          checked={false}
          disabled
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