// @flow
import React, { Component } from "react";
import ShowImage from "./image/ShowImage";
import EditImage from "@canner/image-upload";
import { Button } from "antd";
import createImageService from "@canner/image-service";
import ImageServiceConfig from "@canner/image-service/imageService";

type Props = defaultProps & {
  value: string
};
type State = {
  editPopup: boolean
};

export default class Image extends Component<Props, State> {
  serviceConfig: ImageServiceConfig;
  constructor(props: Props) {
    super(props);
    this.state = {
      editPopup: false
    };
    const { service, dir, filename } = props.uiParams || {};

    // {
    //   service: 'canner' | 'imgur',
    //   dir?: string,
    //   filename?: string
    // }
    // dir 跟 filename 只有用在 canner service 上
    this.serviceConfig = createImageService({
      service,
      dir,
      filename
    }).getServiceConfig();
  }

  componentWillReceiveProps(nextProps: Props) {
    // if value exist, hide edit popup
    if (nextProps.value) {
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

  onChange = (value: Array<string>) => {
    this.props.onChange(this.props.id, "update", value[0]);
  };

  render() {
    const { value } = this.props;
    const { editPopup } = this.state;
    // if the image exist, show it ; else let user upload.
    if (value) {
      return <ShowImage onChange={this.onChange} value={value} />;
    }

    return (
      <div id="react-qa-plugin-image">
        <Button type="primary" onClick={this.showEditPopup}>
          +新增圖片{" "}
        </Button>{" "}
        <EditImage
          onChange={this.onChange}
          editPopup={editPopup}
          serviceConfig={this.serviceConfig}
          closeEditPopup={this.closeEditPopup}
          multiple={false}
        />{" "}
      </div>
    );
  }
}
