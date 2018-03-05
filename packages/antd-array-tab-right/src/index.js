// @flow

import React, { Component } from "react";
import Tab from "@canner/antd-array-tabs";
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';

type Props = ArrayDefaultProps<FieldItems> & {
  value: Array<FieldItems>,
  uiParams: {[string]: any}
};

export default class TabRight extends Component<Props> {
  render() {
    const { uiParams } = this.props;
    return (
      <Tab {...this.props} uiParams={{ ...uiParams, position: "right" }} />
    );
  }
}
