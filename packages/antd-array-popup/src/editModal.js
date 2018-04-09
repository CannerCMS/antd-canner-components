// @flow

import React, { Component } from "react";
import { Modal } from "antd";

import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import {Item, ConfirmButton, CancelButton} from '@canner/react-cms-helpers';
import type {FieldId} from 'types/DefaultProps';

type Props = {
  onChange: (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
  | (Array<{
    refId: FieldId | {[string]: FieldId},
    type: string,
    value?: any
  }>) => Promise<void>,
  updateAction: Array<string>,
  refId: FieldId,
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
    const { updateAction, refId } = this.props;
    const footer = <div>
      <ConfirmButton
        text={<FormattedMessage
          id="array.popup.modal.okText"
          defaultMessage={defaultMessage.en["array.popup.modal.okText"]}
        />}
        callback={this.closeModalAndReset}
      />
      <CancelButton
        text={<FormattedMessage
          id="array.popup.modal.cancelText"
          defaultMessage={defaultMessage.en["array.popup.modal.cancelText"]}
        />}
        callback={this.closeModalAndReset}
      />
    </div>;
    return (
      <Modal
        width="80%"
        visible={visible}
        onCancel={this.handleCancel}
        footer={footer}
      >
        <Item
          refId={refId.child(order)}
          filter={child => updateAction.indexOf(child.name) !== -1}
        />
      </Modal>
    );
  }
}
