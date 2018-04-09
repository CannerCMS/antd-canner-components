// @flow

import React, { Component } from "react";
import { Radio } from "antd";
import { Map, fromJS } from "immutable";
const { Group, Button } = Radio;
import {Item, createEmptyData} from '@canner/react-cms-helpers';

import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  uiParams: {
    options: Array<{title: string, key: string, childName: string}>,
    optionKey: string
  },
  items: {

  }
};

type State = {
  selectedKey: string
};

export default class OptionPlugin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {uiParams, value} = props;
    const {optionKey, options} = uiParams;
    
    this.state = {
      selectedKey: value.get(optionKey) || options[0].key
    };
  }

  static defaultProps = {
    value: Map(), // eslint-disable-line
    uiParams: {
      optionKey: 'type'
    }
  };

  radioOnChange = (e: any) => {
    const selectedKey = e.target.value;
    const {uiParams, onChange, refId, items} = this.props;
    const {optionKey = 'type', options} = uiParams;
    const selectedOption = options.find(option => option.key === selectedKey);
    if (!selectedOption)
      return;
    const emptyValue = createEmptyData(items[selectedOption.childName]);
    onChange(refId, 'update', fromJS({
      [optionKey]: selectedKey,
      [selectedOption.childName]: emptyValue
    }));
    this.setState({
      selectedKey
    });
  }

  render() {
    const { uiParams } = this.props;
    const { options } = uiParams;
    const { selectedKey } = this.state;
    const selectedOption = options.find(option => option.key === selectedKey) || options[0];
    return (
      <div>
        <Group
          value={selectedKey}
          size="large"
          onChange={this.radioOnChange}
        >
          {options.map((option, i) => {
            return <Button key={i} value={option.key}>{option.title}</Button>;
          })}
        </Group>

        <Item
          filter={child => child.keyName === selectedOption.childName}
        />
      </div>
    );
  }
}
