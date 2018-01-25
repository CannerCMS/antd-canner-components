// @flow

import React, { Component } from "react";
import { Radio } from "antd";
import OptionQaForm from "./optionQaForm";
import { Map } from "immutable";
import isUndefined from "lodash/isUndefined";
const { Group, Button } = Radio;
const EMPTY_DATA = "EMPTY_DATA";

type Props = defaultProps & {
  options: Array<{[string]: any}>
};

type State = {
  selectedKey: string
};

export default class RadioOptionPlugin extends Component<Props, State> {
  cachedData: {[string]: any};
  constructor(props: Props) {
    super(props);
    this.init();
  }

  static defaultProps = {
    value: Map() // eslint-disable-line
  };

  init = () => {
    const { options, createEmptyData, value } = this.props;
    let currentOption = value;

    // if cannerJSON is empty map
    if (currentOption.size === 0) {
      currentOption = currentOption.set("key", options[0].key);
      if (options[0].schema) {
        currentOption = currentOption.set(
          "data",
          createEmptyData(options[0].schema)
        );
      }
    }

    // set cannerJSON in cache data
    this.cachedData = {
      [currentOption.get("key")]: isUndefined(currentOption.get("data"))
        ? EMPTY_DATA
        : currentOption.get("data")
    };
    // eslint-disable-next-line
    this.state = {
      selectedKey: currentOption.get("key")
    };
  }

  radioOnChange(e: any) {
    const { options, createEmptyData, onChange, transformData } = this.props;
    const optionKey = e.target.value;
    const option = options.find(option => option.key === optionKey);
    if (!option) {
      throw new Error(`option ${optionKey} not found`);
    }

    if (!this.cachedData[optionKey]) {
      this.cachedData[optionKey] = option.schema
        ? createEmptyData(option.schema)
        : EMPTY_DATA;
    }

    const value = { key: optionKey };
    if (this.cachedData[optionKey] !== EMPTY_DATA) {
      value.data = this.cachedData[optionKey];
    }
    onChange("update", transformData(value));
    this.setState({
      selectedKey: optionKey
    });
  }

  onOptionDataChange({ key, data }: {key: string, data: any}) {
    const { onChange, transformData } = this.props;
    this.cachedData[key] = data;
    onChange("update", transformData({ key, data }));
  }

  renderQa() {
    const { options, items, createEmptyData, description } = this.props;
    const { selectedKey } = this.state;
    const option = options.find(option => option.key === selectedKey);
    const data = this.cachedData[selectedKey];
    return data === EMPTY_DATA ? null : (
      <OptionQaForm
        description={description}
        optionKey={selectedKey}
        onOptionDataChange={this.onOptionDataChange}
        createEmptyData={createEmptyData}
        cannerJSON={data}
        schema={option.schema}
      />
    );
  }

  render() {
    const { options } = this.props;
    const { selectedKey } = this.state;
    return (
      <div>
        <Group
          defaultValue={selectedKey}
          size="large"
          onChange={this.radioOnChange}
        >
          {options.map((option, i) => {
            return <Button key={i} value={option.key}>{option.title}</Button>;
          })}
        </Group>
        {this.renderQa()}
      </div>
    );
  }
}
