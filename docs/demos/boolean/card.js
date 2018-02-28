// @flow
import React, {Component} from 'react';
import BooleanCard from 'packages/antd-boolean-card';

export default class BooleanCardDemo extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>Boolean card</h1>
        <BooleanCard
          id="boolean-card"
          value={false}
          uiParams={{
            yesText: "YES!!",
            noText: "NO!!"
          }}
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}