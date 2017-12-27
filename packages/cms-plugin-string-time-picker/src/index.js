// @flow
import React, { Component } from "react";
import { TimePicker } from "antd";
import moment from "moment-timezone/moment-timezone";

type Props = defaultProps & {
  value: string,
  uiParams: {
    format: string
  }
};

export default class TimePickerPlugin extends Component<Props> {
  static defaultProps = {
    format: "HH:mm"
  };

  onChange = (time: any) => {
    const { format, onChange, id } = this.props;
    const timeString = moment(time).format(format);
    onChange(id, "update", timeString);
  };

  render() {
    const { value, uiParams: { format } } = this.props;
    return (
      <div>
        <TimePicker
          value={value && value.length > 0 ? moment(value, format) : null}
          format={format}
          placeholder="選擇時間"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
