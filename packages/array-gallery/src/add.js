import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import CSSModules from "react-css-modules";
import styles from "./style/add.scss";

@CSSModules(styles)
export default class Add extends Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    return (
      <div styleName="add-container" onClick={this.props.onClick}>
        <Icon type="plus-circle" />
      </div>
    );
  }
}
