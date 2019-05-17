// @flow
import React from "react";
import { Alert, Button, Icon, Upload } from "antd";

type Props = {
  label?: string,
  multiple: boolean,
  onChange: (value: Array<string> | string) => void,
  onClose: (e: any) => void,
  serviceConfig: any
};

type State = {
  fileList: Array<any>,
  error: ?Error
};

export default class FileComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).uploadFile = this.uploadFile.bind(this);
    this.state = {
      error: null,
      fileList: (this: any).props.defaultValue || []
    };
  }

  onClose = (e: any) => {
    this.setState(
      {
        fileList: [],
        error: null
      }
    );
  }

  onError = (e: any) => {
    this.setState({
      fileList: [],
      error: e
    });
  }

  uploadFile(info: { file: any, fileList: Array<any> }) {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

    if (info.file.status === "done") {
      fileList = fileList
        .map(file => {
          if (file.response && file.response.data) {
            file.url = file.response.data.link;
          }

          return file;
        });

      this.props.onChange(fileList);
    }

    this.setState({
      fileList,
    });
  }

  render() {
    const { label = 'Upload', multiple, serviceConfig } = this.props;
    const { error, fileList } = this.state;
    const props = {
      multiple,
      ...serviceConfig,
      onChange: this.uploadFile,
    };

    if (error) {
      return (
        <React.Fragment>
          <Alert
            closable
            message={error.message}
            onClose={this.onClose}
            showIcon
            type="error"
          />
        </React.Fragment>
      );
    }

    return (
      <Upload
        {...props}
        fileList={fileList}
        onError={this.onError}
      >
        <Button type="primary">
          <Icon type="upload" /> {label}
        </Button>
      </Upload>
    );
  }
}
