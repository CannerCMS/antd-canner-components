// @flow

import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import defaultMessage, {renderValue} from "@canner/antd-locales";
import type {FieldId, FieldItems, GotoFn} from 'types/DefaultProps';
import {injectIntl, intlShape} from 'react-intl';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

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

@injectIntl
export default class ArrayBreadcrumb extends Component<Props> {
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

  add = () => {
    const {goTo, refId} = this.props;
    goTo(`${refId.toString()}`, {op: 'create'});
  }

  edit = (recordId: string) => {
    const {goTo, refId} = this.props;
    goTo(`${refId.toString()}/${recordId}`);
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

  render() {
    const {
      uiParams,
      value,
      showPagination,
      items,
      intl
    } = this.props;

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

    // push update button and delete button
    const newColumns = columns.slice();
    const newColumnsRender = renderValue(newColumns, items.items);

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

    return (
      <div>
        <Table
          pagination={showPagination}
          dataSource={value.map((datum, i) => {
            datum.__index = i;
            datum.key = datum.key || i;
            return datum;
          })}
          columns={newColumnsRender}
        />
        {(!createKeys || createKeys.length > 0) && (
          <Button
            type="primary"
            style={{marginTop: '10px'}}
            onClick={this.add}
          >
            {addText}
          </Button>
        )}
      </div>
    );
  }
}
