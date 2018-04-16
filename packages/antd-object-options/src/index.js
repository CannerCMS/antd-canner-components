// @flow

import React, { Component } from "react";
import { Radio } from "antd";
import { Map, fromJS } from "immutable";
import {Item, createEmptyData} from '@canner/react-cms-helpers';

import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';
const { Group, Button } = Radio;

type Props = ObjectDefaultProps & {
  uiParams: {
    options: Array<{title: string, key: string}>,
    optionKey: string
  },
  items: any
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
      optionKey: 'selectedKey'
    }
  };

  radioOnChange = (e: any) => {
    const selectedKey = e.target.value;
    const {uiParams, onChange, refId, items} = this.props;
    const {optionKey = 'selectedKey', options} = uiParams;
    const selectedOption = options.find(option => option.key === selectedKey);
    if (!selectedOption)
      return;

    const emptyValue = createEmptyData(items[selectedOption.key]);
    onChange(refId, 'update', fromJS({
      [optionKey]: selectedKey,
      [selectedOption.key]: emptyValue
    }));
    this.setState({
      selectedKey
    });
  }

  render() {
    const { uiParams, refId } = this.props;
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
          refId={refId}
          filter={child => child.keyName === selectedOption.key}
        />
      </div>
    );
  }
}
