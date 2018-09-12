// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import showDeleteConfirm from "./showDeleteConfirm";
import EditModal from "./editModal";
import AddModal from "./addModal";
import { FormattedMessage } from "react-intl";
import defaultMessage, {renderValue, getIntlMessage} from "@canner/antd-locales";
import {injectIntl} from 'react-intl';

import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {FieldItems} from 'types/DefaultProps';
import {intlShape} from 'react-intl';
import Toolbar from '@canner/antd-share-toolbar';

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
    value: [],
    showPagination: true
  };
  
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showEditModal: false,
      value: props.value
    }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (!nextState.showAddModal && !nextState.showEditModal) {
      return {
        value: nextProps.value
      };
    }
  }

  render() {
    const {
      refId,
      uiParams,
      onChange,
      items,
      deploy,
      intl,
      reset,
      toolbar,
      goTo
    } = this.props;
    const {
      value
    } = this.state;

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

    const newColumns = columns.map(column => {
      return {...column, title: getIntlMessage(intl, column.title)};
    });
    const newColumnsRender = renderValue(newColumns, items.items, {
      refId,
      onChange,
      uiParams,
      goTo,
      reset,
      deploy
    });

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

    return (
      <React.Fragment>
        <Toolbar
          toolbar={toolbar}
          dataSource={value}
        >
        {
          ({value, showPagination}) => {
            return (
              <React.Fragment>
                {(!createKeys || createKeys.length > 0) && (
                  <Button
                    type="primary"
                    style={{
                      marginBottom: '10px',
                      marginLeft: 'auto',
                      display: 'block'
                    }}
                    onClick={() => {
                      if (this.addModal) {
                        this.addModal.showModal(value, value.length);
                      }
                    }}
                  >
                    {addText}
                  </Button>
                )}
                <Table
                  pagination={showPagination}
                  dataSource={value}
                  columns={newColumnsRender}
                />
              </React.Fragment>
            )
          }
        }
        </Toolbar>
        <EditModal
          ref={modal => (this.editModal = modal)}
          refId={refId}
          updateKeys={updateKeys}
          updateShowModal={(state) => this.setState({showEditModal: state})}
          onChange={onChange}
          reset={reset}
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
      </React.Fragment>
    );
  }
}
