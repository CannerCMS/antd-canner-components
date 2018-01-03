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
  onChange = (value: List<string>) => {
    const { onChange, id } = this.props;
    onChange(id, "update", value);
  }

  render() {
    const { value, uiParams } = this.props;
    let { defaultOptions } = uiParams;

    // backward support
    if (uiParams.defaultOption) defaultOptions = uiParams.defaultOption;

    defaultOptions = defaultOptions || ["未分類"];

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
