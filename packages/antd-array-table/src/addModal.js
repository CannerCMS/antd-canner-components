// @flow

import React, {Component} from "react";
import { Modal } from "antd";

// import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import { Item, ConfirmButton, ResetButton } from "canner-helpers";
import type {FieldId} from "types/DefaultProps";

type Props = {
  updateShowModal: (showModal: boolean) => void,
  onChange: (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
  | (Array<{
    refId: FieldId | {[string]: FieldId},
    type: string,
    value?: any
  }>) => Promise<void>,
  createKeys?: Array<string>,
  refId: FieldId,
  items: {[string]: any}
}

type State = {
  order: number,
  visible: boolean
}

export default class AddModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      order: 0,
    };
  }

  showModal = (value: any, order: number) => {
    const {onChange, refId, updateShowModal} = this.props;

    // need to create before update new data
    onChange(refId, "create");
    updateShowModal(true);
    this.setState({
      visible: true,
      order
    });
  }


  closeModalAndReset = () => {
    this.setState({
      visible: false
    }, () => this.props.updateShowModal(false));
  }

  handleCancel = () => {
    this.closeModalAndReset();
  }

  render() {
    const { createKeys, refId } = this.props;
    const { visible, order } = this.state;
    const footer = <div>
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
    </div>;
    return (
      <Modal
        width="80%"
        visible={visible}
        onCancel={this.handleCancel}
        afterClose={this.handleCancel}
        footer={footer}
      >
        {visible && (
          <Item
            refId={refId.child(order)}
            filter={createKeys && (child => createKeys.indexOf(child.name) !== -1)}
          />
        )}
      </Modal>
    );
  }
}
