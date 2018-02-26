import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

export default class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      visible: false,
      index: null
    };
  }

  static propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.string
  };

  showModal(index) {
    this.setState({
      visible: true,
      index
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
      index: null
    });
  }

  handleOk() {
    const { id, onChange } = this.props;
    const { index } = this.state;
    onChange(`${id}/${index}`, "delete");
    this.handleCancel();
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal
        width="300px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="確認"
        cancelText="取消"
      >
        <div>確定刪除這個類別嗎?</div>
      </Modal>
    );
  }
}
