// @flow

import React, { Component } from "react";
import { List } from "immutable";
import Gallery from 'canner-image-gallery';
import type ImageServiceConfig from "@canner/image-service-config/lib/imageService";

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {GenerateIdFn, RenderChildrenFn} from 'types/DefaultProps';

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
  generateId: GenerateIdFn,
  imageServiceConfig: ImageServiceConfig,
  renderChildren: RenderChildrenFn
};

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
    const { generateId, id } = this.props;
    const prevIndex = generateId(id, fromKey, "array");
    const currIndex = generateId(id, toKey, "array");

    this.props.onChange({ firstId: currIndex, secondId: prevIndex }, "swap");
  };

  createImages = (values: ImageItem | Array<ImageItem>) => {
    const { id, transformData, onChange } = this.props;
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
      onChange(id, "create", List([{
        [that.imageKey]: values.image
      }]));
    }
  };

  deleteImage = (imageId: number) => {
    const r = confirm("Are you sure to delete this item?");
    if (r) {
      const { id, generateId, onChange } = this.props;
      const deleteId = generateId(id, imageId, "array");
      onChange(deleteId, "delete");
    }
  };

  render() {
    const { value, id, generateId, renderChildren, imageServiceConfig, uiParams } = this.props;
    const galleryValue = value.map(photo => photo.get(this.imageKey)).toJS()

    return (
      <div style={{maxWidth: '800px'}}>
        <Gallery
          // $FlowFixMe
          value={galleryValue}
          renderContent={
            (i) => {
              const thisId = generateId(id, i, "array");
              return renderChildren({id: thisId})
            }
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
