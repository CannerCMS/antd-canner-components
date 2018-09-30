// @flow
import React, { PureComponent } from "react";
import { Input } from "antd";

// type
import type {StringDefaultProps} from 'types/StringDefaultProps';


type State = {
  value: string
};

type Props = StringDefaultProps & {
  uiParams: {
    addonAfter: string | React.Node,
    addonBefore: string | React.Node,
    prefix: string | React.Node,
    size: 'large' | 'default' | 'smail',
    suffix: string | React.Node,
    type: string
  }
};

export default class StringInput extends PureComponent<Props, State> {
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
        if (!this.isOnComposition) {
          this.props.onChange(this.props.refId, "update", this.state.value);
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
      <div id="input">
        <Input
          disabled={disabled}
          type="text"
          value={value}
          onChange={this.onChange}
          // prevent input called update function when user haven't composited their words using Chinese typing
          onCompositionEnd={this.onCompositionEnd}
          onCompositionStart={this.onCompositionStart}
          {...uiParams}
        />
      </div>
    );
  }
}
