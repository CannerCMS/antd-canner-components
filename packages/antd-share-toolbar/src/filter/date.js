// @flow
import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import get from 'lodash/get';
import set from 'lodash/set';
import './date.css';

const { RangePicker } = DatePicker;

type Props = {
  name: string,
  onChange: Function,
  where: Object
};

export default class TextFilter extends Component<Props> {
  onChange = (dates) => {
    const { name, onChange } = this.props;
    if (dates[0] && dates[1]) {
      const firstDate = dates[0].startOf('day').toISOString();
      const secondDate = dates[1].endOf('day').toISOString();
      onChange(set({}, name, {
        gt: firstDate,
        lt: secondDate,
      }));
    } else if (dates[0]) {
      onChange(set({}, name, {
        gt: dates[0].toISOString(),
      }));
    } else if (dates[1]) {
      onChange(set({}, name, {
        lt: dates[1].toISOString(),
      }));
    } else {
      onChange();
    }
  }

  render() {
    const { where, name } = this.props;
    return (
      <RangePicker
        onChange={this.onChange}
        defaultValue={[moment(get(where, `${name}.gt`)), moment(get(where, `${name}.lt`))]}
      />
    );
  }
}