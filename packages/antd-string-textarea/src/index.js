// @flow

import React, { Component } from "react";
import { Input } from "antd";
const { TextArea } = Input;

// types
import type {FieldDisabled, OnChangeFn} from 'types/DefaultProps';

type Props = {
  value: string,
  id: string,
  disabled: FieldDisabled,
  onChange: OnChangeFn
};

type State = {
  value: string
};

export default class TextareaString extends Component<Props, State> {
  isOnComposition: boolean;
  constructor(props: Props) {
    super(props);
    this.isOnComposition = false;
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value
    });
  }

  onChange = (e: any) => {
    this.setState(
      {
        value: e.target.value
      },
      () => {
        if (!this.isOnComposition)
          this.props.onChange(this.props.id, "update", this.state.value);
      }
    );
  };

  onCompositionStart = () => {
    this.isOnComposition = true;
  };

  onCompositionEnd = () => {
    this.isOnComposition = false;
    this.props.onChange(this.props.id, "update", this.state.value);
  };

  render() {
    const { value } = this.state;
    const { disabled } = this.props;
    return (
      <div id="input">
        <TextArea
          disabled={disabled}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
