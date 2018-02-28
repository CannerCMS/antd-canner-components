// @flow
import React, { Component } from "react";
import { TimePicker } from "antd";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';
import moment from "moment-timezone/moment-timezone";

type Props = {
  id: defaultProps.id,
  value: string,
  onChange: defaultProps.onChange,
  uiParams: {
    format: string
  },
  intl: defaultProps.intl
};

@injectIntl
export default class TimePickerPlugin extends Component<Props> {
  static defaultProps = {
    uiParams: {
      format: "HH:mm"
    }
  };

  onChange = (time: any) => {
    const { uiParams: {format}, onChange, id } = this.props;
    const timeString = moment(time).format(format);
    onChange(id, "update", timeString);
  };

  render() {
    const {
      value,
      uiParams: { format },
      intl
    } = this.props;
    return (
      <div>
        <TimePicker
          value={value && value.length > 0 ? moment(value, format) : null}
          format={format}
          placeholder={
            intl.formatMessage({
              id: "string.timepicker.placeholder",
              defaultMessage: defaultMessage.en["string.timepicker.placeholder"]
            })
          }
          onChange={this.onChange}
        />
      </div>
    );
  }
}
