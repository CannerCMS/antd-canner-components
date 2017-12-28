// @flow

import React from "react";
import PropTypes from "prop-types";
import immutable from "immutable";
import { Modal, message } from "antd";

import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";
import pick from "lodash/pick";

export default class AddModal extends ChangeMethodComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onChange = super.onChange.bind(this);
    this.onChangeMulti = super.onChangeMulti.bind(this);
    this.onChangeApi = super.onChangeApi.bind(this);
    this.state = {
      visible: false,
      record: immutable.fromJS({}),
      idPath: null,
      errors: []
    };
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeMulti: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired,
    createAction: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  showModal(order) {
    const { createAction, createEmptyData, id, items } = this.props;
    const schema = pick(items, createAction);
    console.log(schema);
    console.log(id, order);
    this.setState({
      visible: true,
      record: createEmptyData(schema),
      idPath: [id, order].join("/")
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
      record: immutable.fromJS({}),
      idPath: null,
      errors: []
    });
  }

  handleOk() {
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
