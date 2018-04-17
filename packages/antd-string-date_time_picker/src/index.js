// @flow
import React, { PureComponent } from "react";
import { DatePicker } from "antd";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';

import {
  transformMomentToString,
  transformStringToMoment
} from "./transformFormat";

// type
import type {StringDefaultProps} from 'types/StringDefaultProps';
import type {intlShape} from 'react-intl'

type Props = StringDefaultProps & {
  uiParams: {
    format: string,
    output: string
  },
  intl: intlShape
};

@injectIntl
export default class DateTimePicker extends PureComponent<Props> {
  static defaultProps = {
    uiParams: {
      format: "YYYY/MM/DD",
      output: "ISO_8601"
    }
  };

  onChange = (date: any) => {
    const { onChange, refId, uiParams = {} } = this.props;
    onChange(refId, "update", transformMomentToString(date, uiParams.output));
  };

  render() {
    const { value, uiParams = {}, intl, disabled } = this.props;
    const moment = transformStringToMoment(value, uiParams.output);

    return (
      <DatePicker
        defaultValue={moment}
        disabled={disabled}
        format={uiParams && uiParams.format}
        placeholder={
          intl.formatMessage({
            id: "string.datetimepicker.placeholder",
            defaultMessage: defaultMessage.en["string.datetimepicker.placeholder"]
          })
        }
        onChange={this.onChange}
      />
    );
  }
}
