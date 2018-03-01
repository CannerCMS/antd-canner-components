// @flow
import React, { PureComponent } from "react";
import Card from "@canner/antd-share-card";

// type
import type {StringDefaultProps} from 'types/StringDefaultProps';

type Props = StringDefaultProps & {
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    defaultSelected?: number
  }
};

export default class CardString extends PureComponent<Props> {
  onChange = (val: string) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const { value, uiParams, disabled } = this.props;
    let { options, defaultSelected } = uiParams;

    return (
      <div>
        {options.map((selection, i) => {
          const checked = (
            value ||
            (
              defaultSelected
              && options[defaultSelected]
              && options[defaultSelected].value
            )
          ) === selection.value;

          return (
            <Card
              disabled={disabled}
              checked={checked}
              onChange={this.onChange}
              value={selection.value}
              text={selection.text}
              key={i}
            />
          );
        })}
      </div>
    );
  }
}
