// @flow
import React, { PureComponent } from "react";
import { TimePicker } from "antd";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';
import moment from "moment-timezone/moment-timezone";

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';
import type {IntlShape} from 'react-intl';

type Props = StringDefaultProps & {
  uiParams: {
    format: string
  },
  intl: IntlShape
};

@injectIntl
export default class TimePickerPlugin extends PureComponent<Props> {
  static defaultProps = {
    uiParams: {
      format: "HH:mm"
    }
  };

  onChange = (time: any) => {
    const { uiParams: {format}, onChange, refId } = this.props;
    const timeString = moment(time).format(format);
    onChange(refId, "update", timeString);
  };

  render() {
    const {
      value,
      uiParams: { format },
      intl,
      disabled
    } = this.props;
    return (
      <TimePicker
        value={value && value.length > 0 ? moment(value, format) : null}
        format={format}
        disabled={disabled}
        placeholder={
          intl.formatMessage({
            id: "string.timepicker.placeholder",
            defaultMessage: defaultMessage.en["string.timepicker.placeholder"]
          })
        }
        onChange={this.onChange}
      />
    );
  }
}
