// @flow
import React, { PureComponent } from "react";
import { Select } from "antd";
import {List, Iterable} from 'immutable';
const Option = Select.Option;

type State = {
  value: string
};

type Props = defaultProps & {
  value: List<string>,
  uiParams: {
    defaultOptions: Array<string>
  },
};

export default class TagUi extends PureComponent<Props, State> {
  static defaultProps = {
    uiParams: {
      defaultOptions: ["未分類"]
    },
    value: new List()
  }

  onChange = (value: Array<string>) => {
    const { onChange, id, transformData } = this.props;
    onChange(id, "update", transformData(value));
  }

  render() {
    const { value, uiParams } = this.props;
    let { defaultOptions } = uiParams;

    return (
      <Select
        tags
        style={{ width: "100%" }}
        value={Iterable.isIterable(value) ? value.toJS() : value}
        searchPlaceholder="選擇標籤"
        onChange={this.onChange}
      >
        {defaultOptions.length ? (
          defaultOptions.map(tag => {
            return <Option key={tag}>{tag}</Option>;
          })
        ) : null}
      </Select>
    );
  }
}
