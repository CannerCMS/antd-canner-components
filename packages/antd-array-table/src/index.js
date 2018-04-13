// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import { List } from "immutable";
import renderFunc from "./renderFunc";
import showDeleteConfirm from "./showDeleteConfirm";
import EditModal from "./editModal";
import AddModal from "./addModal";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import {injectIntl} from 'react-intl';

import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';
import {intlShape} from 'react-intl';

type FieldItem = {
  [string]: any,
};

type Props = ArrayDefaultProps<FieldItem> & {
  uiParams: {
    createKeys?: Array<string>,
    updateKeys?: Array<string>,
    disableDelete?: boolean,
    columns: Array<{
      title: string,
      key: string,
      dataIndex: string,
      renderTemplate: string
    }>,
  },
  showPagination: boolean,
  items: FieldItems,
  deploy: Function,
  intl: intlShape
};

@injectIntl
export default class TableArrayPlugin extends Component<Props> {
  editModal: ?EditModal;
  addModal: ?AddModal;
  static defaultProps = {
    value: new List(),
    showPagination: true
  };

  render() {
    const {
      refId,
      uiParams,
      value,
      onChange,
      showPagination,
      items,
      deploy,
      intl
    } = this.props;
    const editText = (
      <FormattedMessage
        id="array.table.editText"
        defaultMessage={defaultMessage.en["array.table.editText"]}
      />
    );
    const deleteText = (
      <FormattedMessage
        id="array.table.deleteText"
        defaultMessage={defaultMessage.en["array.table.deleteText"]}
      />
    );
    const addText = (
      <FormattedMessage
        id="array.table.addText"
        defaultMessage={defaultMessage.en["array.table.addText"]}
      />
    );

    let {
      createKeys,
      updateKeys,
      disableDelete,
      columns = []
    } = uiParams;

    // add update button and delete button
    const newColumns = columns.slice(); // create a new copy of columns
    const newColumnsRender = renderFunc(newColumns, items.items);

    if (!updateKeys || updateKeys.length > 0) {
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

    if (!disableDelete) {
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
                  intl,
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
        {(!createKeys || createKeys.length > 0) && (
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
          updateKeys={updateKeys}
          onChange={onChange}
        />
        <AddModal
          ref={modal => (this.addModal = modal)}
          refId={refId}
          createKeys={createKeys}
          onChange={onChange}
          items={items.items}
        />
      </div>
    );
  }
}
