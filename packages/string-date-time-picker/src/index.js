// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import moment from "moment-timezone/moment-timezone";
import zhTW from "antd/lib/locale-provider/zh_TW";
import handleEpoch from "./handleEpoch";
/*
  這個component和datePicker(舊版的)不一樣的地方是
  回傳的時間是iso格式
*/

type Props = defaultProps & {
  value: string | number,
  uiParams: {
    format: string,
    input: string
  }
};

export default class DateTimePicker extends Component<Props> {
  static defaultProps = {
    uiParams: {
      format: "YYYY/MM/DD HH:mm"
    }
  };

  onChange = (date: any) => {
    const { onChange, id } = this.props;
    onChange(id, "update", moment(date).toISOString());
  };

  render() {
    const { value, uiParams } = this.props;
    const json = handleEpoch(uiParams, value);

    // backward support
    if (uiParams.display) uiParams.format = uiParams.display;

    return (
      <div id="date-time-picker">
        <DatePicker
          value={isEmpty(json) ? null : moment(json, moment.ISO_8601)}
          showTime
          locale={zhTW.DatePicker}
          format={uiParams && uiParams.format}
          placeholder="選擇一個日期"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
