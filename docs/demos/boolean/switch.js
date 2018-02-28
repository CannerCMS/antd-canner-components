// @flow
import React, {Component, Fragment} from 'react';
import BooleanSwitch from 'packages/antd-boolean-switch';
import cmsLocale from 'packages/antd-locales';
import {IntlProvider} from 'react-intl';

export default class BooleanSwitchDemo extends Component<{}> {
  render() {
    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <Fragment>
          <h1>Boolean switch</h1>
          <BooleanSwitch
            id="boolean-switch"
            value={true}
            uiParams={{
              yesText: "YES!!",
              noText: "NO!!"
            }}
            onChange={(id, type, value) => {
              console.log('id: ', id, ', type: ', type, ', value: ', value);
            }}
            />
        </Fragment>
      </IntlProvider>
    );
  }
}