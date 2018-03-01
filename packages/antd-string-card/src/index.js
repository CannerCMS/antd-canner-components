// @flow
import React, { Component } from "react";
import Card from "@canner/antd-share-card";
import { isObjectLike } from "lodash";

// type
import type {FieldId, OnChangeFn} from 'types/DefaultProps';

type Props = {
  value: string,
  onChange: OnChangeFn,
  id: FieldId,
  uiParams: {
    options: Array<{
      text: string,
      value: string
    }>,
    texts?: Array<string>,
    imgs?: Array<string>,
    imgStyle?: { [string]: any },
    labelStyle?: { [string]: any },
    defaultSelected?: number
  }
};

export default class CardString extends Component<Props> {
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
      options: {
        value: string,
        text: string,
        img: string
      } = options.map((opt, i) => {
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
          const checked = (
            value ||
              (isObjectLike(options[defaultSelected])
                ? options[defaultSelected].value
                : options[defaultSelected])
          ) === selection.value;

          return (
            <Card
              checked={checked}
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
