// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import InputString from "@canner/cms-plugin-string-input";
import CSSModules from "react-css-modules";
import styles from "./style/Link.scss";
import defaultMessage from "./locales";
import { FormattedMessage } from "react-intl";

@CSSModules(styles)
export default class LinkString extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

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
