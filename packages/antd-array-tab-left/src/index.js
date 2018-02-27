// @flow

import React, { Component } from "react";
import Tab from "@canner/antd-array-tabs/src";

type Props = defaultProps & {
  value: Array<{
    [string]: any
  }>
};

export default class TabLeft extends Component<Props> {
  render() {
    const { uiParams } = this.props;
    return (
      // $FlowFixMe decorator props
      <Tab
        {...this.props}
        uiParams={{ ...uiParams, position: "left" }}
        />
    );
  }
}
