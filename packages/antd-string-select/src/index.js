// @flow

import React, { PureComponent } from "react";
import { Select } from "antd";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';
const Option = Select.Option;

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';
import type {IntlShape} from 'react-intl';

type UIParams = {|
  options: Array<{
    text: string,
    value: string
  }>,
  defaultSelected?: number
|};

type Props = StringDefaultProps & {
  uiParams: UIParams,
  intl: IntlShape
};

@injectIntl
export default class SelectString extends PureComponent<Props> {
  static defaultProps = {
    uiParams: {
      options: []
    }
  };

  onChange = (val: string) => {
    this.props.onChange(this.props.refId, "update", val);
  };

  render() {
    const { value, disabled, intl } = this.props;
    let { uiParams } = this.props;
    let { options } = uiParams;
  
    const { defaultSelected } = uiParams;
    return (
      <Select
        style={{ width: 150 }}
        disabled={disabled}
        value={
          value ||
          (defaultSelected
          && options[defaultSelected]
          && options[defaultSelected].value)
        }
        placeholder={
          intl.formatMessage({
            id: "string.select.placeholder",
            defaultMessage: defaultMessage.en["string.select.placeholder"]
          })
        }
        onChange={this.onChange}
      >
        {options.map((opt, i) => {
          const { text, value } = opt;
          return (
            <Option value={value} key={i}>
              {text || value}
            </Option>
          );
        })}
      </Select>
    );
  }
}
