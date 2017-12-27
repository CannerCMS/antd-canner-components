// @flow

import React, { Component } from "react";
import Tab from "@canner/arrat-tabs";

type Props = defaultProps & {
  value: Array<{
    [string]: any
  }>
};

export default class TabLeft extends Component<Props> {
  render() {
    const { uiParams } = this.props;
    return <Tab {...this.props} uiParams={{ ...uiParams, position: "left" }} />;
  }
}
