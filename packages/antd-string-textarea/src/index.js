// @flow

import React, { PureComponent } from "react";
import { Input } from "antd";
const { TextArea } = Input;

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';

type Props = StringDefaultProps;

type State = {
  value: string
};

export default class TextareaString extends PureComponent<Props, State> {
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
    const {uiParams = {}, onChange, refId} = this.props;
    const formatter = uiParams.formatter || function(str) {return str;};
    this.setState(
      {
        value: e.target.value
      },
      () => {
        if (!this.isOnComposition) {
          onChange(refId, "update", formatter(this.state.value));
        }
      }
    );
  };

  onCompositionStart = () => {
    this.isOnComposition = true;
  };

  onCompositionEnd = () => {
    this.isOnComposition = false;
    this.props.onChange(this.props.refId, "update", this.state.value);
  };

  render() {
    const { value } = this.state;
    const { disabled, uiParams = {} } = this.props;
    return (
      <TextArea
        rows={uiParams.rows || 6}
        disabled={disabled}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}
