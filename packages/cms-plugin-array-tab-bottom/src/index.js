// @flow

import React, { Component } from "react";
import Tab from "@canner/cms-plugin-array-tabs";

type Props = defaultProps & {
  value: Array<{
    [string]: any
  }>
};

export default class TabBottom extends Component<Props> {
  render() {
    const { uiParams } = this.props;
    return (
      <Tab {...this.props} uiParams={{ ...uiParams, position: "bottom" }} />
    );
  }
}
