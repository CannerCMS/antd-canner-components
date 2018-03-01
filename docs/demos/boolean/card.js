// @flow
import * as React from 'react';
import BooleanCard from 'packages/antd-boolean-card';
import {Divider} from 'antd';

export default class BooleanCardDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>Boolean card</Divider>
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
        <Divider>Disabled boolean card</Divider>
        <BooleanCard
          id="boolean-card"
          disabled
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