// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import { List } from "immutable";
import showDeleteConfirm from "./showDeleteConfirm";
import EditModal from "./editModal";
import AddModal from "./addModal";
import { FormattedMessage } from "react-intl";
import defaultMessage, {renderValue} from "@canner/antd-locales";
import {injectIntl} from 'react-intl';

import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';
import {intlShape} from 'react-intl';

const ButtonGroup = Button.Group;

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
  intl: intlShape,
  reset: Function
};

type State = {
  showAddModal: boolean
}

@injectIntl
export default class TableArrayPlugin extends Component<Props, State> {
  editModal: ?EditModal;
  addModal: ?AddModal;
  static defaultProps = {
    value: new List(),
    showPagination: true
  };

  state = {
    showAddModal: false
  }

  render() {
    const {
      refId,
      uiParams,
      value,
      onChange,
      showPagination,
      items,
      deploy,
      intl,
      reset
    } = this.props;

    const {showAddModal} = this.state;

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
    const newColumnsRender = renderValue(newColumns, items.items);

    if ((!updateKeys || updateKeys.length > 0) || !disableDelete) {
      newColumnsRender.push({
        title: intl.formatMessage({ id: "array.table.actions" }),
        dataIndex: "__settings",
        key: "__settings",
        render: (text, record) => {
          return (
            <ButtonGroup>
              {(!updateKeys || updateKeys.length > 0) && (
                <Button
                  icon="edit"
                  onClick={() => {
                    if (this.editModal)
                      this.editModal.showModal(value, record.__index);
                  }}
                />
              )}
              {!disableDelete && (
                <Button
                  icon="delete"
                  onClick={() =>
                    showDeleteConfirm({
                      refId,
                      onChange,
                      intl,
                      deploy,
                      order: record.__index
                    })
                  }
                />
              )}
            </ButtonGroup>
          );
        }
      });
    }

    const originalData = value.toJS().map((datum, i) => {
      (datum: any).__index = i;
      (datum: any).key = (datum: any).key || i;
      return datum;
    });

    const data = showAddModal ? originalData.slice(0, -1) : originalData;

    return (
      <div>
        <Table
          pagination={showPagination}
          dataSource={data}
          columns={newColumnsRender}
        />
        {(!createKeys || createKeys.length > 0) && (
          <Button
            type="primary"
            style={{marginTop: "10px"}}
            onClick={() => {
              if (this.addModal) {
                this.addModal.showModal(value, value.size);
              }
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
          reset={reset}
          updateShowModal={(state) => this.setState({showAddModal: state})}
          createKeys={createKeys}
          onChange={onChange}
          items={items.items}
        />
      </div>
    );
  }
}
