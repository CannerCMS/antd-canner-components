// @flow

import React, { Component } from "react";
import { Input } from "antd";

type Props = defaultProps & {
  value: string,
  id: string
};

type State = {
  value: string
};

export default class TextareaString extends Component<Props, State> {
  isOnComposition: boolean;
  constructor(props) {
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
    const { readOnly } = this.props;
    return (
      <div id="input">
        <Input
          disable={readOnly}
          type="textarea"
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
