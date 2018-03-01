// @flow
import * as React from 'react';
import Input from 'packages/antd-string-input';
import {Divider} from 'antd';

export default class InputDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>General input</Divider>
        <Input
          id="input"
          value="this is input value"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <Divider>Disabled input</Divider>
        <Input
          id="input"
          value="this is input value"
          disabled
          />
      </React.Fragment>
    );
  }
}