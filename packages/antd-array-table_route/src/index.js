// @flow

import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import defaultMessage, {renderValue} from "@canner/antd-locales";
import type {FieldId, FieldItems, GotoFn} from 'types/DefaultProps';
import {injectIntl, intlShape} from 'react-intl';
import Toolbar from '@canner/antd-share-toolbar';
import styled from 'styled-components';
import get from 'lodash/get';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

const Wrapper = styled.div`
  .antd td {
    white-space: nowrap;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    word-break: initial;
  }
`

type Props = {
  refId: FieldId,
  items: FieldItems,
  goTo: GotoFn,
  value: Array<any>,
  uiParams: {
    createKeys: Array<string>,
    updateKeys: Array<string>,
    columns: Array<{
      title: string,
      key: string,
      dataIndex: number,
      renderTemplate: string
    }>
  },
  onChange: Function,
  deploy: Function,
  showPagination: boolean,
  intl: intlShape
};

type State = {
  selectedRowKeys: Array<string>
}


export default @injectIntl class ArrayBreadcrumb extends Component<Props, State> {
  editModal: ?HTMLDivElement;
  addModal: ?HTMLDivElement;
  static defaultProps = {
    value: [],
    showPagination: true,
    schema: {}
  };

  static contextTypes = {
    fetch: PropTypes.func
  }

  state = {
    selectedRowKeys: []
  }

  add = () => {
    const {goTo, refId} = this.props;
    goTo({pathname: refId.toString(), operator: 'create'});
  }

  edit = (recordId: string) => {
    const {goTo, refId} = this.props;
    goTo({pathname:`${refId.toString()}/${recordId}`});
  }

  remove = (index: number) => {
    const {onChange, deploy, refId, value, intl} = this.props;
    confirm({
      title: intl.formatMessage({ id: "array.table.delete.confirm" }),
      okType: 'danger',
      onOk() {
        onChange(refId.child(index), 'delete').then(() => {
          deploy(refId.getPathArr()[0], value[index].id);
        });
      }
    });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  render() {
    const {
      uiParams,
      value,
      items,
      toolbar,
      intl,
      deploy,
      goTo,
      reset,
      refId,
      onChange,
      keyName,
      request,
      rootValue
    } = this.props;
    const {selectedRowKeys} = this.state;
    const addText = (
      <FormattedMessage
        id="array.table.addText"
        defaultMessage={defaultMessage.en["array.table.addText"]}
      />
    );

    let {
      createKeys,
      columns = []
    } = uiParams;

    const newColumnsRender = renderValue(columns, items.items, {
      refId,
      deploy,
      reset,
      onChange,
      goTo,
      uiParams
    });

    // add edit and delete action buttons
    newColumnsRender.push({
      title: intl.formatMessage({ id: "array.table.actions" }),
      dataIndex: "__settings",
      key: "__settings",
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button icon="edit"
              onClick={() => this.edit(record.id)}
            />
            <Button icon="delete"
              onClick={() => this.remove(record.__index)}
            />
          </ButtonGroup>
        );
      }
    });
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const selectedValue = value.filter(item => selectedRowKeys.indexOf(item.id) > -1);
    const recordValue = get(rootValue, refId.remove().getPathArr());
    return (
      <Wrapper>
        <Toolbar
          toolbar={toolbar}
          dataSource={value}
          recordValue={recordValue}
          selectedValue={selectedValue}
          items={items}
          keyName={keyName}
          request={request}
          deploy={deploy}
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
                      onClick={this.add}
                    >
                      {addText}
                    </Button>
                  )}
                  <Table
                    rowSelection={get(toolbar, 'actions.export') ? rowSelection : undefined}
                    pagination={showPagination}
                    dataSource={value}
                    columns={newColumnsRender}
                    scroll={{x: true}}
                    rowKey="id"
                  />
                </React.Fragment>
              )
            }
          }
        </Toolbar>
      </Wrapper>
    );
  }
}
