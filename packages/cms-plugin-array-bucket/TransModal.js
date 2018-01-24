import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Select } from "antd";
const Option = Select.Option;

export default class TransModal extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onSelectKey = this.onSelectKey.bind(this);
    this.state = {
      visible: false,
      srcBucketIndex: -1,
      destBucketIndex: -1
    };
  }

  static propTypes = {
    transferBucket: PropTypes.func,
    cannerJSON: PropTypes.object.isRequired
  };

  showModal(option, index) {
    this.setState({
      option,
      visible: true,
      srcBucketIndex: index,
      destBucketIndex: index
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
      srcBucketIndex: -1,
      destBucketIndex: -1
    });
  }

  handleOk() {
    const { transferBucket } = this.props;
    const { option, srcBucketIndex, destBucketIndex } = this.state;
    if (srcBucketIndex === destBucketIndex) {
      this.handleCancel();
    } else {
      transferBucket(option, srcBucketIndex, destBucketIndex);
      this.handleCancel();
    }
  }

  onSelectKey(index) {
    this.setState({ destBucketIndex: index });
  }

  render() {
    const { visible, destBucketIndex } = this.state;
    const { cannerJSON } = this.props;
    return (
      <Modal
        width="300px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="確認"
        cancelText="取消"
      >
        <div>
          <span>移至: </span>
          <Select
            style={{ width: 200 }}
            onChange={this.onSelectKey}
            value={destBucketIndex}
          >
            {cannerJSON.map((bucket, i) => {
              return (
                <Option key={i} value={i}>
                  {bucket.get("name")}
                </Option>
              );
            })}
            <Option value={-1}>未分類</Option>
          </Select>
        </div>
      </Modal>
    );
  }
}
