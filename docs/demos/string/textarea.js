// @flow
import React, {Component} from 'react';
import Textarea from 'packages/antd-string-textarea';

export default class TextareaDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Normal textarea</h1>
        <Textarea
          id="textarea"
          value="this is textarea value"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <h1>Disabled textarea</h1>
        <Textarea
          id="textarea"
          value="this is textarea value"
          disabled
          />
      </React.Fragment>
    );
  }
}