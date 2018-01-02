// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import { fromJS } from "immutable";
import renderFunc from "./renderFunc";
import showDeleteConfirm from "./showDeleteConfirm";
import PropTypes from "prop-types";
import EditModal from "./editModal";
import AddModal from "./addModal";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";

type Props = defaultProps & {
  value: Array<any>,
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
  onChangeMulti: Function,
  showPagination: boolean
};

export default class PopupArrayPlugin extends Component<Props> {
  editModal: ?HTMLDivElement;
  addModal: ?HTMLDivElement;
  static defaultProps = {
    value: fromJS([]),
    showPagination: true,
    schema: {}
  };

  static contextTypes = {
    rootValue: PropTypes.object
    // query is the function from endpoint to fetch data
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      id,
      uiParams,
      value,
      onChange,
      onChangeMulti,
      createEmptyData,
      renderChildren,
      showPagination,
      items
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
    const schemaKets = Object.keys(schema);
    let {
      createAction = schemaKets,
      updateAction = schemaKets,
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
                  id,
                  onChange,
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
            datum.__index = i;
            datum.key = datum.key || i;
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
          id={id}
          renderChildren={renderChildren}
          updateAction={updateAction}
          onChange={onChange}
          onChangeMulti={onChangeMulti}
        />
        <AddModal
          ref={modal => (this.addModal = modal)}
          id={id}
          renderChildren={renderChildren}
          createAction={createAction}
          onChange={onChange}
          onChangeMulti={onChangeMulti}
          items={items.items}
          createEmptyData={createEmptyData}
        />
      </div>
    );
  }
}
