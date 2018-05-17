// @flow

import React, { Component } from "react";
import { List } from "immutable";
import Gallery from 'canner-image-gallery';
import {Modal} from 'antd';
import { Item, transformData } from 'canner-helpers';
import {injectIntl} from 'react-intl';
const {confirm} = Modal;

import type ImageServiceConfig from "@canner/image-service-config/lib/imageService";

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import {intlShape} from 'react-intl';

type FieldItem = {
  [string]: any
}

type ImageItem = {
  index: number,
  image: string
}

type Props = ArrayDefaultProps<FieldItem> & {
  uiParams: {
    imageKey: string,
    disableDrag: boolean
  },
  imageServiceConfig: ImageServiceConfig,
  intl: intlShape
};

@injectIntl
export default class ArrayGallery extends Component<Props> {
  imageKey: string;

  constructor(props: Props) {
    super(props);
    const { uiParams } = props;
    this.imageKey = uiParams.imageKey || "image";
  }

  static defaultProps = {
    value: new List(),
    uiParams: {}
  };

  onSwap = (fromKey: number, toKey: number) => {
    const { refId } = this.props;
    const prevIndex = refId.child(fromKey);
    const currIndex = refId.child(toKey);

    this.props.onChange({ firstRefId: currIndex, secondRefId: prevIndex }, "swap");
  };

  createImages = (values: ImageItem | Array<ImageItem>) => {
    const { refId, onChange } = this.props;
    const that = this;

    if (Array.isArray(values)) {
      const createValues = values.map((val) => {
        return {
          id: `${val.index}`,
          type: "create",
          value: transformData({
            [this.imageKey]: val.image
          })
        };
      });
      // $FlowFixMe
      onChange(createValues);
    } else {
      onChange(refId, "create", List([{
        [that.imageKey]: values.image
      }]));
    }
  };

  deleteImage = (imageIndex: number) => {
    const { intl, refId, onChange } = this.props;
    confirm({
      title: intl.formatMessage({ id: "array.tab.delete.confirm" }),
      onOk() {
        onChange(refId.child(imageIndex), "delete")
      }
    })
  };

  render() {
    const { value, refId, imageServiceConfig, uiParams } = this.props;
    const galleryValue = value.map(photo => photo.get(this.imageKey)).toJS()

    return (
      <div style={{maxWidth: '800px'}}>
        <Gallery
          // $FlowFixMe
          value={galleryValue}
          renderContent={
            (i) => <Item
              refId={refId.child(i)}
            />
          }
          disableDrag={uiParams.disableDrag}
          onDelete={this.deleteImage}
          onCreate={this.createImages}
          onSwap={this.onSwap}
          // $FlowFixMe
          serviceConfig={imageServiceConfig}
          />
      </div>
    );
  }
}
