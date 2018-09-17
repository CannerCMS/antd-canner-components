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
    service: string,
    dir: string,
    filename: string
  },
  disabled: boolean,
  imageStorage: any
};

type State = {
  editPopup: boolean
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
    const { value, disabled, imageStorage } = this.props;
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
          imageStorage={imageStorage}
          closeEditPopup={this.closeEditPopup}
          multiple={false}
        />
      </div>
    );
  }
}
