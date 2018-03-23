// @flow

import React, {Component} from "react";
import { Modal } from "antd";

// import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import pick from "lodash/pick";

type Props = {
  onChange: (id: any, type: string, value: any) => void,
  createAction: Array<string>,
  id: string,
  renderChildren: Function,
  items: {[string]: any},
  createEmptyData: Function
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
    const { createAction, createEmptyData, items, onChange, id } = this.props;
    const schema = pick(items, createAction);
    onChange(id, "create", createEmptyData(schema));
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
    const { createAction, renderChildren, id } = this.props;
    const { visible, order } = this.state;
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
              readOnly: createAction.indexOf(child.name) === -1
            }), {
              text: <FormattedMessage
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
