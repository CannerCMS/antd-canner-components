// @flow

import React, { Component } from "react";
import { Table, Button, Icon, Popconfirm } from "antd";
import {get} from 'lodash';
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
    columns: Array<{
      title: string,
      key: string,
      dataIndex: string,
      renderTemplate: string
    }>,
    bordered: boolean,
    components: Object,
    footer: Function,
    showHeader: boolean,
    size: 'default' | 'middle' | 'small',
    createButtonPosition: 'right' | 'left',
    disableActionsColumn: boolean
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

export default @injectIntl class TableArrayPlugin extends Component<Props, State> {
  static defaultProps = {
    value: [],
    showPagination: true
  };
  
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
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
      goTo,
      rootValue,
      request,
      keyName,
      disabled = {},
      value
    } = this.props;
    const {
      selectedRowKeys
    } = this.state;

    const addText = (
      <FormattedMessage
        id="array.table.addText"
        defaultMessage={defaultMessage.en["array.table.addText"]}
      />
    );
    let {
      columns = [],
      bordered,
      components,
      footer,
      showHeader = true,
      size = 'default',
      createButtonPosition = 'right',
    } = uiParams;
    let disableCreate = false;
    let disableUpdate = false;
    let disableDelete = false;
    if (typeof disabled === 'boolean') {
      if (disabled) {
        disableCreate = true;
        disableUpdate = true;
        disableDelete = true;
      }
    } else if (typeof disabled === 'object') {
      disableCreate = disabled.create;
      disableUpdate = disabled.update;
      disableDelete = disabled.delete;
    }
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
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const selectedValue = value.filter(item => selectedRowKeys.indexOf(item.id) > -1);

    const recordValue = get(rootValue, refId.remove().getPathArr());
    if (!disableUpdate || !disableDelete) {
      newColumnsRender.push({
        title: intl.formatMessage({ id: "array.table.actions" }),
        dataIndex: "__settings",
        key: "__settings",
        render: (text, record) => {
          return (
            <ButtonGroup>
              {!disableUpdate && (
                <Button
                  icon="edit"
                  data-testid="edit-button"
                  onClick={() => this.props.update(text, record)}
                />
              )}
              {!disableDelete && (
                <Popconfirm
                  title={intl.formatMessage({ id: "array.table.delete.confirm" })}
                  onConfirm={() => this.props.delete(text, record)}
                  okType="danger"
                >
                  <Button
                    icon="delete"
                    data-testid="delete-button"
                  />
                </Popconfirm>
              )}
            </ButtonGroup>
          );
        }
      });
    }
    return (
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
              {!disableCreate && (
                <Button
                  type="primary"
                  style={{
                    marginBottom: '10px',
                    marginLeft: createButtonPosition === 'right' ? 'auto' : 0,
                    display: 'block'
                  }}
                  data-testid="add-button"
                  onClick={this.props.create}
                >
                  <Icon type="plus" />{addText}
                </Button>
              )}
              <Table
                rowSelection={get(toolbar, 'actions.export') ? rowSelection : undefined}
                pagination={showPagination}
                dataSource={value}
                columns={newColumnsRender}
                scroll={{ x: true }}
                rowKey="id"
                bordered={bordered}
                components={components}
                footer={footer}
                showHeader={showHeader}
                size={size}
              />
            </React.Fragment>
          )
        }
      }
      </Toolbar>
    );
  }
}
