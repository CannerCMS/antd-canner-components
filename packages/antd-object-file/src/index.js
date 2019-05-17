import React, { PureComponent } from "react";
import { Upload, Button, Icon } from "antd";
import { isArray } from "lodash";
import FileComponent from "./file";

function getFilePayloadByValue(value) {
  let obj = value;
  if (isArray(value)) {
    obj = value[0];
  }

  return {
    contentType: obj.type,
    name: obj.name,
    size: obj.size,
    url: obj.url,
  };
}

export default class File extends React.PureComponent {
  onChange = (newValue) => {
    const { uiParams: { filename }, value } = this.props;
    const filePayload = getFilePayloadByValue(newValue);
    if (filename) {
      filePayload.name = filename
    }

    this.props.onChange(this.props.refId, "update", {...value, ...filePayload});
  }

  render() {
    const {
      fileStorage,
      uiParams: { filename, limitSize },
      value,
    } = this.props;

    let defaultValue = [];
    if (value && value.url) {
      defaultValue.push({ uid: value.url, ...value});
    }

    return (
      <FileComponent
        defaultValue={defaultValue}
        multiple={false}
        onChange={this.onChange}
        serviceConfig={{
          customRequest: (obj) => {
            const { file, onError, onProgress, onSuccess } = obj;
            if (!fileStorage) {
              onError(new Error('There is no storage config so you can\'t upload file. Checkout the storage section to know more'));
              return;
            }

            if (limitSize && file.size > limitSize) {
              onError(new Error(`The file is larger than the limit ${limitSize}`));
              return;
            }

            fileStorage
              .upload(file, { filename: filename || file.name }, onProgress)
              .then(({ link }) => onSuccess({ data: { link } }))
              .catch(onError);
          }
        }}
      />
    );
  }
}
