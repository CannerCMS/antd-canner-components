// @flow
import React, { Component } from "react";
import InputString from "@canner/antd-string-input";
import CSSModules from "react-css-modules";
import defaultMessage from "@canner/antd-locales";
import { FormattedMessage } from "react-intl";
import styles from "./style/Link.scss";

// type
import type {FieldId, OnChangeFn} from 'types/DefaultProps';

type Props = {
  id: FieldId,
  value: string,
  onChange: OnChangeFn
}

@CSSModules(styles)
export default class LinkString extends Component<Props> {
  render() {
    const { value, onChange, id } = this.props;
    return (
      <div>
        <InputString id={id} value={value} onChange={onChange} />
        <div styleName="preview">
          <FormattedMessage
            id="string.link.preview"
            defaultMessage={defaultMessage.en["string.link.preview"]}
          />
          <a href={value} target="_blank">
            {value}
          </a>
        </div>
      </div>
    );
  }
}
