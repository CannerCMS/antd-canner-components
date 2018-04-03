// @flow
import React, { PureComponent } from "react";
import Card from "@canner/antd-share-card";

// type
import type {BooleanDefaultProps} from 'types/BooleanDefaultProps';

type Props = BooleanDefaultProps & {
  uiParams: {
    yesText: string,
    noText: string
  }
};
export default class CardBoolean extends PureComponent<Props> {
  onChange = (val: boolean) => {
    const {onChange, refId} = this.props
    onChange(refId, "update", val);
  };

  render() {
    const {
      disabled,
      value,
      uiParams: {
        yesText,
        noText
      }
    } = this.props;

    return (
      <div>
        <Card
          disabled={disabled}
          checked={value === true}
          onChange={this.onChange}
          value={true}
          text={yesText}
        />
        <Card
          disabled={disabled}
          checked={value === false}
          onChange={this.onChange}
          value={false}
          text={noText}
        />
      </div>
    );
  }
}
