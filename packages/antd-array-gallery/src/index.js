// @flow

import React, { Component } from "react";
import Gallery from 'canner-image-gallery';
import {Modal} from 'antd';
import { Item } from 'canner-helpers';
import {injectIntl} from 'react-intl';
const {confirm} = Modal;

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
    dirname: string,
    imageKey: string,
    disableDrag: boolean,
    limitSize: ?number,
    rowHeight?: string,
    grid?: {
      xs?: number,
      sm?: number,
      md?: number,
      lg?: number
    },
    imageStyle?: Object
  },
  imageStorage: any,
  intl: intlShape
};

type CustomRequestArgs = {
  onProgress: (event: { percent: number }) => void,
  onError: (event: Error, body?: Object) => void,
  onSuccess: (body: Object) => void,
  data: Object,
  filename: String,
  file: File,
  withCredentials: Boolean,
  action: String,
  headers: Object
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
    value: [],
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
          refId,
          type: "create",
          value: {
            [that.imageKey]: {
              url: val.image
            }
          }
        };
      });
      // $FlowFixMe
      onChange(createValues);
    } else {
      onChange(refId, "create", {
        [that.imageKey]: {
          url: values.image
        }
      });
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
    const { value, refId, imageStorage, uiParams: {limitSize, disableDrag, dirname, imageStyle, rowHeight, grid}, intl } = this.props;
    const galleryValue = value.map(photo => photo[this.imageKey].url);
    return (
      <Gallery
        // $FlowFixMe
        value={galleryValue}
        renderContent={
          (i) => <Item
            refId={refId.child(i)}
          />
        }
        disableDrag={disableDrag}
        onDelete={this.deleteImage}
        onCreate={this.createImages}
        onSwap={this.onSwap}
        imageStyle={imageStyle}
        rowHeight={rowHeight || '200px'}
        grid={grid}
        // $FlowFixMe
        serviceConfig={{
          customRequest: (obj: CustomRequestArgs) => {
            const {file, onProgress, onSuccess, onError} = obj;
            if (!imageStorage) {
              onError(new Error(intl.formatMessage({id: 'image.error.noStorage'})));
              return;
            }

            if (limitSize && file.size > limitSize) {
              onError(new Error(intl.formatMessage({
                id: 'image.error.limitSize'
              }, {
                limitSize
              })));                return;
            }
            imageStorage
              .upload(file, {filename: genFilename(dirname, file.name)}, onProgress)
              .then(({link}) => onSuccess({data: {link}}))
              .catch(onError);
        }}}/>
    );
  }
}

function genFilename(dir, filename) {
  return `${dir || ''}${dir ? '/' : ''}${filename}`;
}