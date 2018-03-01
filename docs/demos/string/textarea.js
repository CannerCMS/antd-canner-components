// @flow
import * as React from 'react';
import Textarea from 'packages/antd-string-textarea';
import {Divider} from 'antd';

export default class TextareaDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>General textarea</Divider>
        <Textarea
          id="textarea"
          value="this is textarea value"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <Divider>Disabled textarea</Divider>
        <Textarea
          id="textarea"
          value="this is textarea value"
          disabled
          />
      </React.Fragment>
    );
  }
}