// @flow
import React, { PureComponent } from "react";
import { Select } from "antd";
import {List} from 'immutable';
import defaultMessage from "@canner/antd-locales";
import {injectIntl, FormattedMessage} from 'react-intl';
const Option = Select.Option;

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {intlShape} from 'react-intl'

type Props = ArrayDefaultProps & {
  uiParams: {
    defaultOptions: Array<string>
  },
  intl: intlShape,
  disabled: boolean
};

@injectIntl
export default class TagUi extends PureComponent<Props> {
  static defaultProps = {
    uiParams: {
      defaultOptions: [
        <FormattedMessage
          id="array.tag.defaultoption"
          key="defaultOpt"
          defaultMessage={defaultMessage.en["array.tag.placeholder"]}
          />
      ]
    },
    value: new List()
  }

  onChange = (value: Array<string>) => {
    const { onChange, id, transformData } = this.props;
    onChange(id, "update", transformData(value));
  }

  render() {
    const { value, uiParams, intl, disabled } = this.props;
    let { defaultOptions } = uiParams;

    return (
      <Select
        mode="tags"
        disabled={disabled}
        style={{ width: "100%" }}
        value={List.isList(value) ? value.toJS() : value}
        searchPlaceholder={
          intl.formatMessage({
            id: "array.tag.placeholder",
            defaultMessage: defaultMessage.en["array.tag.placeholder"]
          })
        }
        onChange={this.onChange}
      >
        {defaultOptions.length ? (
          defaultOptions.map(tag => {
            return <Option key={tag}>{tag}</Option>;
          })
        ) : null}
      </Select>
    );
  }
}
