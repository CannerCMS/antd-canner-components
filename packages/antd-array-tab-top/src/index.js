// @flow

import React, { Component } from "react";
import Tab from "@canner/antd-array-tabs";
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';

type Props = ArrayDefaultProps<{[string]: any}> & {
  uiParams: {[string]: any}
};

export default class TabTop extends Component<Props> {
  render() {
    return <Tab {...this.props} />;
  }
}
