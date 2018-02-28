// @flow
import React, { Component } from "react";
import Label from "./label";
import Img from "./img";
import CSSModules from "react-css-modules";
import styles from "./style/Card.scss";

type Props = {
  checked: boolean,
  value: string | boolean,
  onChange: (value: string | boolean) => void,
  text: string,
  img: string,
  imgStyle: { [string]: any },
  labelStyle: { [string]: any }
};

@CSSModules(styles)
export default class Card extends Component<Props> {
  onChange = (value: string | boolean) => {
    this.props.onChange(value);
  };

  render() {
    const {
      value,
      checked,
      img,
      imgStyle,
      labelStyle,
      text
    } = this.props;
    let displayText = text || value;
    if (typeof value === "boolean") {
      displayText = text || (value ? "YES" : "NO");
    }
    return (
      <label styleName="label">
        <Label
          checked={checked}
          labelStyle={labelStyle}
          onClick={() => this.onChange(value)}
        >
          {img ? <Img src={img} imgStyle={imgStyle} /> : null}
          {displayText}
        </Label>
      </label>
    );
  }
}
