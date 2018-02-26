// @flow
import React, { Component } from "react";
import InputString from "@canner/cms-plugin-string-input";
import CSSModules from "react-css-modules";
import styles from "./style/Link.scss";
import defaultMessage from "@canner/cms-locales";
import { FormattedMessage } from "react-intl";

type Props = defaultProps & {
  value: string
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
