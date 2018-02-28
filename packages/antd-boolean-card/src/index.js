// @flow
import React, { Component } from "react";
import Card from "@canner/antd-share-card";

type Props = {
  id: defaultProps.id,
  onChange: defaultProps.onChange,
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
    // backward support
    if (text) {
      yesText = text[0];
      noText = text[1];
    }

    // backward support
    if (imgs) {
      yesText = text[0];
      noText = text[1];
    }

    return (
      <div>
        <Card
          checked={value === true}
          onChange={this.onChange}
          value={true}
          text={yesText}
          img={yesImg}
          imgStyle={imgStyle}
          labelStyle={labelStyle}
        />
        <Card
          checked={value === false}
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
