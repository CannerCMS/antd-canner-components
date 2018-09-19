// @flow
import React, { PureComponent } from "react";
import ShowImage from "./image/ShowImage";
import EditImage from "@canner/image-upload";
import defaultMessage from '@canner/antd-locales';
import {isArray} from 'lodash';
import { Button } from "antd";
import {FormattedMessage} from "react-intl";

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  uiParams: {
    filename: string,
    dirname: string,
    limitSize: ?number
  },
  disabled: boolean,
  imageStorage: any
};

type State = {
  editPopup: boolean
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

export default class Image extends PureComponent<Props, State> {
  state = {
    editPopup: false
  };

  componentWillReceiveProps(nextProps: Props) {
    // if value exist, hide edit popup
    if (nextProps.value.url) {
      this.setState({
        editPopup: false
      });
    }
  }

  showEditPopup = () => {
    this.setState({
      editPopup: true
    });
  };

  closeEditPopup = () => {
    this.setState({
      editPopup: false
    });
  };

  onChange = (newValue: Array<string> | string) => {
    const {value} = this.props;
    let url = newValue;
    if (isArray(newValue)) {
      url = newValue[0];
    }

    this.props.onChange(this.props.refId, "update", {...value, url});
  };

  render() {
    const { value, disabled, imageStorage, uiParams: {filename, dirname, limitSize} } = this.props;
    const { editPopup } = this.state;
    // if the image exist show it, otherwise let user upload.
    if (value && value.url) {
      return (
        <ShowImage
          onChange={this.onChange}
          value={value.url}
          disabled={disabled}/>
      );
    }

    return (
      <div>
        <Button type="primary" onClick={this.showEditPopup} disabled={disabled}>
          + <FormattedMessage id="string.image.add" defaultMessage={defaultMessage.en["string.image.add"]}/>
        </Button>
        <EditImage
          onChange={this.onChange}
          editPopup={editPopup}
          serviceConfig={{
            customRequest: (obj: CustomRequestArgs) => {
              const {file, onProgress, onSuccess, onError} = obj;
              if (!imageStorage) {
                onError(new Error('There is no imageStorage.'));
                return;
              }
              if (limitSize && file.size > limitSize) {
                onError(new Error(`Image is larger than the limit ${limitSize} bytes`));
                return;
              }
              imageStorage
                .upload(file, {filename: genFilename(dirname, filename || file.name)}, onProgress)
                .then(({link}) => onSuccess({data: {link}}))
                .catch(onError);
              
          }}}
          closeEditPopup={this.closeEditPopup}
          multiple={false}
        />
      </div>
    );
  }
}

function genFilename(dir, filename) {
  return `${dir || ''}${dir ? '/' : ''}${filename}`;
}