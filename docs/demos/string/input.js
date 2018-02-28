// @flow
import React, {Component} from 'react';
import Input from 'packages/antd-string-input';

export default class InputDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Normal input</h1>
        <Input
          id="input"
          value="this is input value"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <h1>Disabled input</h1>
        <Input
          id="input"
          value="this is input value"
          disabled
          />
      </React.Fragment>
    );
  }
}