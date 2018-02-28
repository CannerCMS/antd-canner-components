// @flow
import React, {Component} from 'react';
import StringSelect from 'packages/antd-string-select';

export default class SelectDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Normal select with value</h1>
        <StringSelect
          id="select"
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
        <h1>Normal select using default value</h1>
        <StringSelect
          id="select"
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