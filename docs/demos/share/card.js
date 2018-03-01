// @flow
import * as React from 'react';
import ShareCard from 'packages/antd-share-card';

export default class ShareCardDemo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <h1>share card - not selected</h1>
        <ShareCard
          checked={false}
          value="hello"
          text="this is hello"
          onChange={(id, type, value) => {
            console.log('id: ', id, ', type: ', type, ', value: ', value);
          }}
          />

        <h1>share card - selected</h1>
        <ShareCard
          checked={true}
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