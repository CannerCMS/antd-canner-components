// @flow

import React, { PureComponent } from "react";
import { Switch } from "antd";
import { injectIntl } from "react-intl";

// type
import type {BooleanDefaultProps} from 'types/BooleanDefaultProps';
import type {IntlShape} from 'react-intl';

type Props = BooleanDefaultProps & {
  uiParams: {
    yesText: string,
    noText: string
  },
  intl: IntlShape
}

@injectIntl
export default class SwitchBoolean extends PureComponent<Props> {
  onChange = (e: boolean) => {
    this.props.onChange(this.props.id, "update", e);
  }

  render() {
    const { value, uiParams, intl, disabled } = this.props;
    const defaultYesText = intl.formatMessage({ id: "boolean.switch.yesText" });
    const defaultNoText = intl.formatMessage({ id: "boolean.switch.noText" });
    return (
      <div>
        <Switch
          disabled={disabled}
          onChange={this.onChange}
          checked={value}
          checkedChildren={
            uiParams && uiParams.yesText ? uiParams.yesText : defaultYesText
          }
          unCheckedChildren={
            uiParams && uiParams.noText ? uiParams.noText : defaultNoText
          }
        />
      </div>
    );
  }
}
