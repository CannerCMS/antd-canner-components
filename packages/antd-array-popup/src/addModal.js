// @flow

import React, {Component} from "react";
import { Modal } from "antd";

// import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import { Item, ConfirmButton, CancelButton } from "@canner/react-cms-helpers";
import type {FieldId} from "types/DefaultProps";

type Props = {
  onChange: (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
  | (Array<{
    refId: FieldId | {[string]: FieldId},
    type: string,
    value?: any
  }>) => Promise<void>,
  createAction: Array<string>,
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
    const {onChange, refId} = this.props;
    onChange(refId, "create");
    this.setState({
      visible: true,
      order
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
    const { createAction, refId } = this.props;
    const { visible, order } = this.state;
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
          filter={child => createAction.indexOf(child.name) !== -1}
        />
      </Modal>
    );
  }
}
