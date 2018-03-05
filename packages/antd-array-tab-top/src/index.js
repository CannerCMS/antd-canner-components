// @flow

import React, { Component } from "react";
import Tab from "@canner/antd-array-tabs";
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';

type Props = ArrayDefaultProps<FieldItems> & {
  value: Array<FieldItems>
};

export default class TabTop extends Component<Props> {
  render() {
    return <Tab {...this.props} />;
  }
}
