// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import { List } from "immutable";
import renderFunc from "./renderFunc";
import showDeleteConfirm from "./showDeleteConfirm";
import EditModal from "./editModal";
import AddModal from "./addModal";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';

type FieldItem = {
  [string]: any,
};

type Props = ArrayDefaultProps<FieldItem> & {
  uiParams: {
    createAction: Array<string>,
    updateAction: Array<string>,
    deleteAction: boolean,
    columns: Array<{
      title: string,
      key: string,
      dataIndex: number,
      renderTemplate: string
    }>,
  },
  showPagination: boolean,
  items: FieldItems,
  deploy: Function
};

export default class PopupArrayPlugin extends Component<Props> {
  editModal: ?EditModal;
  addModal: ?AddModal;
  static defaultProps = {
    value: new List(),
    showPagination: true,
    schema: {}
  };

  render() {
    const {
      refId,
      uiParams,
      value,
      onChange,
      showPagination,
      items,
      deploy
    } = this.props;
    const editText = (
      <FormattedMessage
        id="array.popup.editText"
        defaultMessage={defaultMessage.en["array.popup.editText"]}
      />
    );
    const deleteText = (
      <FormattedMessage
        id="array.popup.deleteText"
        defaultMessage={defaultMessage.en["array.popup.deleteText"]}
      />
    );
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
    if (!isEmpty(updateAction)) {
      newColumnsRender.push({
        title: editText,
        dataIndex: "__settings",
        key: "__settings",
        render: (text, record) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                if (this.editModal)
                  this.editModal.showModal(value, record.__index);
              }}
            >
              {editText}
            </Button>
          );
        }
      });
    }

    if (deleteAction !== false && !isNull(deleteAction)) {
      newColumnsRender.push({
        title: deleteText,
        dataIndex: "__delete",
        key: "__delete",
        render: (text, record) => {
          return (
            <Button
              type="ghost"
              onClick={() =>
                showDeleteConfirm({
                  refId,
                  onChange,
                  deploy,
                  order: record.__index
                })
              }
            >
              {deleteText}
            </Button>
          );
        }
      });
    }
    return (
      <div>
        <Table
          pagination={showPagination}
          dataSource={value.toJS().map((datum, i) => {
            (datum: any).__index = i;
            (datum: any).key = (datum: any).key || i;
            return datum;
          })}
          columns={newColumnsRender}
        />
        {isEmpty(createAction) ? null : (
          <Button
            type="primary"
            onClick={() => {
              if (this.addModal)
                this.addModal.showModal(value, value.size);
            }}
          >
            {addText}
          </Button>
        )}
        <EditModal
          ref={modal => (this.editModal = modal)}
          refId={refId}
          updateAction={updateAction}
          onChange={onChange}
        />
        <AddModal
          ref={modal => (this.addModal = modal)}
          refId={refId}
          createAction={createAction}
          onChange={onChange}
          items={items.items}
        />
      </div>
    );
  }
}
