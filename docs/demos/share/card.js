// @flow
import * as React from 'react';
import ShareCard from 'packages/antd-share-card';
import {Divider} from 'antd';

export default class ShareCardDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Divider>share card - not selected</Divider>
        <ShareCard
          checked={false}
          value="hello"
          text="this is hello"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />

        <Divider>share card - selected</Divider>
        <ShareCard
          checked={true}
          value="hello"
          text="this is hello"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
        <Divider>Disabled share card - not selected</Divider>
        <ShareCard
          checked={false}
          disabled
          value="hello"
          text="this is hello"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />

        <Divider>Disabled share card - selected</Divider>
        <ShareCard
          checked={true}
          disabled
          value="hello"
          text="this is hello"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />
      </React.Fragment>
    );
  }
}