// @flow
import * as React from 'react';
import StringRadio from 'packages/antd-string-radio';
import {Divider} from 'antd';

export default class RadioDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>General radio</Divider>
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
        <Divider>radio with default value</Divider>
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
        <Divider>Disabled radio</Divider>
        <StringRadio
          id="radio"
          value="1"
          disabled
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