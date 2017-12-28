// @flow

import React from "react";
import { fromJS } from "immutable";
import { Modal } from "antd";

import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";
import pick from "lodash/pick";

type Props = {
  onChange: (id: any, type: string, value: any) => void,
  createAction: Array<string>,
  id: string,
  renderChildren: Function,
  items: {[string]: any},
  createEmptyData: Function
}

export default class AddModal extends ChangeMethodComponent {
  constructor(props: Props) {
    super(props);
    this.onChange = super.onChange.bind(this);
    this.onChangeMulti = super.onChangeMulti.bind(this);
    this.onChangeApi = super.onChangeApi.bind(this);
    this.state = {
      visible: false,
      record: fromJS({}),
      idPath: null,
      errors: []
    };
  }

  showModal = (order: number) => {
    const { createAction, createEmptyData, id, items } = this.props;
    const schema = pick(items, createAction);
    this.setState({
      visible: true,
      record: createEmptyData(schema),
      idPath: [id, order].join("/")
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      record: fromJS({}),
      idPath: null,
      errors: []
    });
  }

  handleOk = () => {
    const { onChange } = this.props;
    const { idPath } = this.state;
    const that = this;

    onChange(idPath, "create", that.state.record);
    that.handleCancel();
  }

  render() {
    const { createAction, renderChildren } = this.props;
    const { visible, record, idPath } = this.state;
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
              value: record,
              id: idPath,
              onChange: this.onChange,
              // not work now, need to resolve it
              readOnly: createAction.indexOf(child.title) !== -1
            }))
          : null}
      </Modal>
    );
  }
}
