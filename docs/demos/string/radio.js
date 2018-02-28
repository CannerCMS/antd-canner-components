// @flow
import React, {Component} from 'react';
import StringRadio from 'packages/antd-string-radio';

export default class RadioDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Normal radio with value</h1>
        <StringRadio
          id="radio"
          value="1"
          uiParams={{
            options: [{
              text: 'option 1',
              value: "1"
            }, {
              text: 'option 2',
              value: "2"
            }],
            defaultSelected: 1
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <h1>Normal radio using default value</h1>
        <StringRadio
          id="radio"
          value="1"
          uiParams={{
            options: [{
              text: 'option 1',
              value: "1"
            }, {
              text: 'option 2',
              value: "2"
            }],
            defaultSelected: 1
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}