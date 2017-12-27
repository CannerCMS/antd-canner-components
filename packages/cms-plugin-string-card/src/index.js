// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@canner/card";
import { isObjectLike } from "lodash";

type Props = defaultProps & {
  value: string,
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    imgs: Array<string>,
    imgStyle: { [string]: any },
    labelStyle: { [string]: any },
    defaultSelected: number
  }
};

export default class CardString extends Component {
  onChange = (val: string) => {
    this.props.onChange(this.props.id, "update", val);
  };

  render() {
    const {
      value,
      uiParams: { texts, imgs, imgStyle, labelStyle, defaultSelected }
    } = this.props;

    let { options } = this.props.uiParams;

    // backward support
    if (texts || imgs) {
      options = options.map((opt, i) => {
        return {
          value: opt,
          text: texts && texts[i],
          img: imgs && imgs[i]
        };
      });
    }
    return (
      <div>
        {options.map((selection, i) => {
          return (
            <Card
              selectedValue={
                value ||
                (isObjectLike(options[defaultSelected])
                  ? options[defaultSelected].value
                  : options[defaultSelected])
              }
              onChange={this.onChange}
              value={selection.value}
              text={selection.text}
              img={selection.img}
              key={i}
              imgStyle={imgStyle}
              labelStyle={labelStyle}
            />
          );
        })}
      </div>
    );
  }
}
