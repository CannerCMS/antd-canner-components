import React from "react";
import { Alert, Button, Icon, Upload } from "antd";

export default class FileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      error: null,
      fileList: this.props.defaultValue || []
    };
  }

  finishErrorEdit = () => {
    this.setState(
      {
        fileList: [],
        displayFileList: [],
        error: null
      }
    );
  }

  onError = (e) => {
    this.setState({
      fileList: [],
      error: e
    });
  }

  uploadFile(info) {
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
            onClose={this.finishErrorEdit}
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
