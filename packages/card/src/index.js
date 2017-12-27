// @flow
import React, { Component } from "react";
import Label from "./label";
import Img from "./img";
import CSSModules from "react-css-modules";
import styles from "./style/Card.scss";

type Props = {
  selectedValue: string | boolean,
  value: string | boolean,
  onChange: () => void,
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
      selectedValue,
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
          checked={selectedValue === value}
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
