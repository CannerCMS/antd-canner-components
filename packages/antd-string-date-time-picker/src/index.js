// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import {
  transformMomentToString,
  transformStringToMoment
} from "./transformFormat";

type Props = defaultProps & {
  value: string | number,
  uiParams: {
    format: string,
    output: string
  }
};

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
    const { value, uiParams = {} } = this.props;
    const moment = transformStringToMoment(value, uiParams.output);

    // backward support
    if (uiParams.display) uiParams.format = uiParams.display;

    return (
      <div id="date-time-picker">
        <DatePicker
          value={moment}
          showTime
          format={uiParams && uiParams.format}
          placeholder="選擇一個日期"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
