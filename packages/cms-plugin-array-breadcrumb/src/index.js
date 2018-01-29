// @flow

import React, { Component } from "react";
import { Table, Button, Icon, Modal } from "antd";
import { List } from "immutable";
import renderFunc from "./renderFunc";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
type Props = defaultProps & {
  value: List<any>,
  uiParams: {
    createAction: Array<string>,
    updateAction: Array<string>,
    columns: Array<{
      title: string,
      key: string,
      dataIndex: number,
      renderTemplate: string
    }>
  },
  rootValue: any,
  showPagination: boolean
};

export default class ArrayBreadcrumb extends Component<Props> {
  editModal: ?HTMLDivElement;
  addModal: ?HTMLDivElement;
  static defaultProps = {
    value: new List(),
    showPagination: true,
    schema: {}
  };

  add = () => {
    const {goTo, id} = this.props;
    goTo(`/${id}?op=create`);
  }

  edit = (recordId: string) => {
    const {goTo, id} = this.props;
    goTo(`/${id}/${recordId}`);
  }

  remove = (index: number) => {
    const {onChange, id} = this.props;
    confirm({
      title: 'Are you sure delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onChange(`${id}/${index}`, 'delete');
      }
    });
    
  }

  render() {
    const {
      id,
      uiParams,
      value,
      onChange,
      showPagination,
      items
    } = this.props;
    const addText = (
      <FormattedMessage
        id="array.popup.addText"
        defaultMessage={defaultMessage.en["array.popup.addText"]}
      />
    );
    const schema = items.items;
    const schemaKeys = Object.keys(schema);
    let {
      createAction = schemaKeys,
      updateAction = schemaKeys,
      deleteAction = true,
      columns = []
    } = uiParams;

    // push update button and delete button
    const newColumns = columns.slice();
    // 為了向後相容 當 schema.items undefined時
    // 拿 schema.createAction.schema.items
    const newColumnsRender = renderFunc(newColumns, items.items);
    newColumnsRender.push({
      title: 'Actions',
      dataIndex: "__settings",
      key: "__settings",
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button icon="edit"
              onClick={() => this.edit(record._id)}
            />
            <Button icon="delete"
              onClick={() => this.remove(record.__index)}
            />
          </ButtonGroup>
        );
      }
    });

    return (
      <div>
        <Table
          pagination={showPagination}
          dataSource={value.toJS().map((datum, i) => {
            datum.__index = i;
            datum.key = datum.key || i;
            return datum;
          })}
          columns={newColumnsRender}
        />
        {isEmpty(createAction) ? null : (
          <Button
            type="primary"
            onClick={this.add}
          >
            {addText}
          </Button>
        )}
      </div>
    );
  }
}
