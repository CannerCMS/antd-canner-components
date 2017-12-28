// @flow

import React, { Component } from "react";
import Tab from "@canner/cms-plugin-array-tabs";

type Props = defaultProps & {
  value: Array<{
    [string]: any
  }>
};

export default class TabTop extends Component<Props> {
  render() {
    return <Tab {...this.props} />;
  }
}
