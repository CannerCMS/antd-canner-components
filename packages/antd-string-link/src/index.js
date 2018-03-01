// @flow
import React, { Component } from "react";
import InputString from "@canner/antd-string-input";
import CSSModules from "react-css-modules";
import defaultMessage from "@canner/antd-locales";
import { FormattedMessage } from "react-intl";
import styles from "./style/Link.scss";

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';

type Props = StringDefaultProps

@CSSModules(styles)
export default class LinkString extends Component<Props> {
  render() {
    const { value, onChange, id, disabled } = this.props;
    return (
      <div>
        <InputString id={id} value={value} onChange={onChange} disabled={disabled}/>
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
