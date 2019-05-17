// @flow
import React, { PureComponent } from "react";
import { Upload, Button, Icon } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { isArray } from "lodash";
import defaultMessage from '@canner/antd-locales';
import FileComponent from "./file";

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  fileStorage: any,
  intl: Object,
  uiParams: {
    filename?: string,
    limitSize?: number
  }
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

function getFilePayloadByValue(value: Object) {
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

@injectIntl
export default class File extends React.PureComponent<Props> {
  onChange = (newValue: Array<string> | string) => {
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
      intl,
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
              onError(new Error(intl.formatMessage({ id: 'file.error.noStorage' })));
              return;
            }

            if (limitSize && file.size > limitSize) {
              onError(new Error(intl.formatMessage(
                { id: 'file.error.limitSize' },
                { limitSize }
              )));
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
