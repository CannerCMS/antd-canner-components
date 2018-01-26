// @flow
import React, { Component } from "react";
import Card from "@canner/cms-plugin-share-card";

type Props = defaultProps & {
  value: boolean,
  uiParams: {
    yesText: string,
    noText: string,
    yesImg: string,
    noImg: string,
    imgStyle: { [string]: any },
    labelStyle: { [string]: any }
  }
};
export default class CardBoolean extends Component<Props> {
  onChange = (val: boolean) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    let {
      value,
      uiParams: {
        yesText,
        noText,
        yesImg,
        noImg,
        text,
        imgs,
        imgStyle,
        labelStyle
      }
    } = this.props;
    // 向後相容
    if (text) {
      yesText = text[0];
      noText = text[1];
    }

    // 向後相容
    if (imgs) {
      yesText = text[0];
      noText = text[1];
    }

    return (
      <div>
        <Card
          selectedValue={value}
          onChange={this.onChange}
          value={true}
          text={yesText}
          img={yesImg}
          imgStyle={imgStyle}
          labelStyle={labelStyle}
        />
        <Card
          selectedValue={value}
          onChange={this.onChange}
          value={false}
          text={noText}
          img={noImg}
          imgStyle={imgStyle}
          labelStyle={labelStyle}
        />
      </div>
    );
  }
}
