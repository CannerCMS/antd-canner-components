// @flow
import React from "react";
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

const DateTimePicker = (props: Props) => {
  const { value, uiParams = {
    format: "YYYY/MM/DD",
    output: "ISO_8601"
  }, intl, disabled, refId, onChange } = props;

  const pickerOnChange = (date: any) => {
    onChange(refId, "update", transformMomentToString(date, uiParams.output));
  };

  let date = transformStringToMoment(value, uiParams.output);
  if (uiParams.timezone) {
    date = date.tz(uiParams.timezone);
  }
  return (
    <DatePicker
      value={date}
      disabled={disabled}
      format={uiParams && uiParams.format}
      placeholder={
        intl.formatMessage({
          id: "string.datetimepicker.placeholder",
          defaultMessage: defaultMessage.en["string.datetimepicker.placeholder"]
        })
      }
      onChange={pickerOnChange}
    />
  );
}

export default injectIntl(DateTimePicker);
