// @flow
import React, { Component } from "react";
import { DatePicker } from "antd";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';

import {
  transformMomentToString,
  transformStringToMoment
} from "./transformFormat";

type Props = {
  id: defaultProps.id,
  onChange: defaultProps.onChange,
  value: string | number,
  uiParams: {
    format: string,
    output: string
  },
  intl: defaultProps.intl
};

@injectIntl
export default class DateTimePicker extends Component<Props> {
  static defaultProps = {
    uiParams: {
      format: "YYYY/MM/DD HH:mm",
      output: "ISO_8601"
    }
  };

  onChange = (date: any) => {
    const { onChange, id, uiParams = {} } = this.props;
    onChange(id, "update", transformMomentToString(date, uiParams.output));
  };

  render() {
    const { value, uiParams = {}, intl } = this.props;
    const moment = transformStringToMoment(value, uiParams.output);

    // backward support
    if (uiParams.display) uiParams.format = uiParams.display;

    return (
      <div id="date-time-picker">
        <DatePicker
          value={moment}
          showTime
          format={uiParams && uiParams.format}
          placeholder={
            intl.formatMessage({
              id: "string.datetimepicker.placeholder",
              defaultMessage: defaultMessage.en["string.datetimepicker.placeholder"]
            })
          }
          onChange={this.onChange}
        />
      </div>
    );
  }
}
