// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";

type Props = {
  onChange: (id: any, type: string, value: any) => void,
  updateAction: Array<string>,
  id: string,
  renderChildren: Function,
}

type State = {
  visible: boolean,
  order: number
}

export default class EditModal extends Component<Props, State> {
  static contextTypes = {
    deploy: PropTypes.func,
    reset: PropTypes.func
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      order: 0,
    };
  }

  showModal = (value: any, i: number) => {
    this.setState({
      visible: true,
      order: i
    });
  }

  closeModalAndReset = () => {
    this.setState({
      visible: false
    });
  }

  handleCancel = () => {
    this.closeModalAndReset();
  }

  render() {
    const { visible, order } = this.state;
    const { updateAction, renderChildren, id } = this.props;
    return (
      <Modal
        width="80%"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        {visible
          ? renderChildren(child => ({
              id: `${id}/${order}`,
              // not work now, need to resolve it
              readOnly: updateAction.indexOf(child.name) === -1
            }), {
              text:  <FormattedMessage
                id="array.popup.modal.okText"
                defaultMessage={defaultMessage.en["array.popup.modal.okText"]}
              />,
              callback: this.closeModalAndReset
            }, {
              text:  <FormattedMessage
                id="array.popup.modal.cancelText"
                defaultMessage={defaultMessage.en["array.popup.modal.cancelText"]}
              />,
              callback: this.closeModalAndReset
            })
          : null}
      </Modal>
    );
  }
}
