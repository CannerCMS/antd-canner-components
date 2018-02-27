import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";
import { Modal } from "antd";
import ChangeMethodComponent from "./ChangeMethod";

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
      bucket: new Map(),
      idPath: null,
      errors: []
    };
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeMulti: PropTypes.func.isRequired,
    Items: PropTypes.object,
    plugins: PropTypes.object.isRequired,
    updateAction: PropTypes.shape({
      validators: PropTypes.object,
      schema: PropTypes.object.isRequired
    }).isRequired
  };

  showModal(order) {
    const { schema, id, createEmptyData } = this.props;
    this.setState({
      visible: true,
      bucket: createEmptyData(schema),
      idPath: [id, order].join("/")
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
      bucket: new Map(),
      idPath: null,
      errors: []
    });
  }

  handleOk() {
    const { onChange } = this.props;
    const { idPath, bucket } = this.state;
    const that = this;
    onChange(idPath, "create", bucket);
    that.handleCancel();
  }

  render() {
    const { visible, bucket, idPath, errors } = this.state;
    const { plugins, Items, schema } = this.props;
    return (
      <Modal
        width="80%"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="確認"
        cancelText="取消"
      >
        {visible ? (
          <Items
            cannerJSON={bucket}
            schema={schema}
            plugins={plugins}
            errors={errors}
            onChange={this.onChange}
            onChangeMulti={this.onChangeMulti}
            onChangeApi={this.onChangeApi}
            id={idPath}
          />
        ) : null}
      </Modal>
    );
  }
}
