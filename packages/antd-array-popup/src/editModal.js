// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";

type Props = {
  onChange: (id: any, type: string, value: any) => void,
  updateAction: Array<string>,
  id: string,
  renderChildren: Function,
  items: {[string]: any},
  createEmptyData: Function
}

export default class EditModal extends Component<Props> {
  static contextTypes = {
    deploy: PropTypes.func,
    reset: PropTypes.func
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      order: 0,
      errors: []
    };
  }

  showModal = (value: any, i: number) => {
    this.setState({
      visible: true,
      order: i
    });
  }

  closeModalAndReset = () => {
    const {id, query} = this.props;
    const key = id.split('/')[0];
    this.setState({
      visible: false
    });
    this.context.reset(key, query);
  }

  handleCancel = () => {
    this.closeModalAndReset();
  }

  handleOk = () => {
    const {deploy} = this.context;
    deploy().then(() => {
      this.closeModalAndReset();
    });
  }

  render() {
    const { visible, order } = this.state;
    const { updateAction, renderChildren, id } = this.props;
    return (
      <Modal
        width="80%"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText={
          <FormattedMessage
            id="array.popup.modal.okText"
            defaultMessage={defaultMessage.en["array.popup.modal.okText"]}
          />
        }
        cancelText={
          <FormattedMessage
            id="array.popup.modal.cancelText"
            defaultMessage={defaultMessage.en["array.popup.modal.cancelText"]}
          />
        }
      >
        {visible
          ? renderChildren(child => ({
              id: `${id}/${order}`,
              // not work now, need to resolve it
              readOnly: updateAction.indexOf(child.name) === -1
            }))
          : null}
      </Modal>
    );
  }
}
