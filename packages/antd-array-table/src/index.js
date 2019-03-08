// @flow

import React, { useRef } from "react";
import EditModal from "./editModal";
import AddModal from "./addModal";
import {injectIntl} from 'react-intl';
import styled from 'styled-components';
import Table from '@canner/antd-share-table';

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

const Wrapper = styled.div`
  .antd td {
    white-space: nowrap;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    word-break: initial;
  }
`

const TableArrayPlugin = (props: Props) => {
  const addModalEl = useRef(null);
  const editModalEl = useRef(null);

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
    value = []
  } = props;

  const updateItem = (text, record) => {
    editModalEl.current.showModal(record.__index);
  }

  const deleteItem = (text, record) => {
    const index = record.__index;
    onChange(refId.child(index), 'delete').then(() => {
      deploy(refId.getPathArr()[0], value[index].id);
    });
  }

  const createItem = () => {
    addModalEl.current.showModal(value.length);
  }
  
  return (
    <Wrapper>
      <Table
        refId={refId}
        uiParams={uiParams}
        onChange={onChange}
        items={items}
        deploy={deploy}
        intl={intl}
        reset={reset}
        toolbar={toolbar}
        goTo={goTo}
        rootValue={rootValue}
        request={request}
        keyName={keyName}
        disabled={disabled}
        value={value}
        delete={deleteItem}
        create={createItem}
        update={updateItem}
      />
      <EditModal
        ref={editModalEl}
        refId={refId}
        updateKeys={uiParams.updateKeys}
        onChange={onChange}
        reset={reset}
      />
      <AddModal
        ref={addModalEl}
        refId={refId}
        reset={reset}
        updateShowModal={() => {}}
        createKeys={uiParams.createKeys}
        onChange={onChange}
        items={items.items}
      />
    </Wrapper>
  );
}

export default injectIntl(TableArrayPlugin)