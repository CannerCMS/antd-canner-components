// @flow

import React, {Component} from "react";
import { Modal } from "antd";

// import ChangeMethodComponent from "./changeMethodComponent";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";
import pick from "lodash/pick";
import PropTypes from 'prop-types';

type Props = {
  onChange: (id: any, type: string, value: any) => void,
  createAction: Array<string>,
  id: string,
  renderChildren: Function,
  items: {[string]: any},
  createEmptyData: Function
}

export default class AddModal extends Component<Props> {
  static contextTypes = {
    deploy: PropTypes.func,
    reset: PropTypes.func
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      order: 0,
      errors: []
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
    const {id, query} = this.props;
    const key = id.split('/')[0];
    this.setState({
      visible: false
    });
    this.context.reset(key, query);
  }

  handleCancel = () => {
    this.closeModalAndReset();
  }

  handleOk = () => {
    const {deploy} = this.context;
    deploy().then(() => {
      this.closeModalAndReset();
    });
  }

  render() {
    const { createAction, renderChildren, id, rootValue } = this.props;
    const { visible, order } = this.state;
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
              id: `${id}/${order}`,
              rootValue,
              // not work now, need to resolve it
              readOnly: createAction.indexOf(child.title) !== -1
            }))
          : null}
      </Modal>
    );
  }
}
