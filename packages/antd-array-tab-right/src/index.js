// @flow

import React, { Component } from "react";
import Tab from "@canner/antd-array-tabs/src";

type Props = defaultProps & {
  value: Array<{
    [string]: any
  }>
};

export default class TabRight extends Component<Props> {
  render() {
    const { uiParams } = this.props;
    return (
      <Tab {...this.props} uiParams={{ ...uiParams, position: "right" }} />
    );
  }
}
