// @flow

import React, { Component } from "react";
import { Input } from "antd";
const { TextArea } = Input;
type Props = defaultProps & {
  value: string,
  id: string
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
    console.log('textarea render');
    const { value } = this.state;
    const { readOnly } = this.props;
    return (
      <div id="input">
        <TextArea
          disable={readOnly}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
