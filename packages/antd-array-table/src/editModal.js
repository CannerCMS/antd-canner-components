// @flow

import React, { Component } from "react";
import { Modal } from "antd";

import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import {Item, ConfirmButton, ResetButton} from 'canner-helpers';
import type {FieldId} from 'types/DefaultProps';

type Props = {
  updateShowModal: (showModal: boolean) => void,
  onChange: (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
  | (Array<{
    refId: FieldId | {[string]: FieldId},
    type: string,
    value?: any
  }>) => Promise<void>,
  updateKeys?: Array<string>,
  refId: FieldId,
  reset: Function
}

type State = {
  visible: boolean,
  order: number
}

export default class EditModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      order: 0,
    };
  }

  showModal = (i: number) => {
    const {updateShowModal} = this.props;
    this.setState({
      visible: true,
      order: i
    });
    updateShowModal(true);
  }

  closeModalAndReset = () => {
    const {updateShowModal} = this.props;
    const {reset, refId} = this.props;
    this.setState({
      visible: false
    }, () => {
      reset(refId);
      updateShowModal(false);
    });
  }

  handleCancel = () => {
    this.closeModalAndReset();
  }

  render() {
    const { visible, order } = this.state;
    const { updateKeys, refId } = this.props;
    const footer = (
      <div>
        <ConfirmButton
          text={<FormattedMessage
            id="array.table.modal.okText"
            defaultMessage={defaultMessage.en["array.table.modal.okText"]}
          />}
          callback={this.closeModalAndReset}
        />
        <ResetButton
          text={<FormattedMessage
            id="array.table.modal.cancelText"
            defaultMessage={defaultMessage.en["array.table.modal.cancelText"]}
          />}
          callback={this.closeModalAndReset}
        />
      </div>
    );

    return (
      <Modal
        width="80%"
        visible={visible}
        onCancel={this.handleCancel}
        footer={footer}
      >
        {visible && (
          <Item
            refId={refId.child(order)}
            filter={updateKeys && (child => updateKeys.indexOf(child.name) !== -1)}
          />
        )}
      </Modal>
    );
  }
}
