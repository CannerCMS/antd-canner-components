// @flow

import React from "react";
import Table from '@canner/antd-share-table';
import type {FieldId, FieldItems, GotoFn} from 'types/DefaultProps';
import {injectIntl, intlShape} from 'react-intl';
import styled from 'styled-components';

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
      render: string
    }>
  },
  onChange: Function,
  deploy: Function,
  intl: intlShape
};


const ArrayBreadcrumb = (props: Props) => {

  const {
    uiParams,
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
    rootValue,
    disabled,
    value = []
  } = props;

  const createItem = () => {
    goTo({pathname: refId.toString(), operator: 'create'});
  }

  const updateItem = (text: string, record: Object) => {
    goTo({pathname:`${refId.toString()}/${record.id}`});
  }

  const deleteItem = (text: string, record: number) => {
    const index = record.__index;
    
    onChange(refId.child(index), 'delete').then(() => {
      deploy(refId.getPathArr()[0], value[index].id);
    });
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
    </Wrapper>
  );
}

export default injectIntl(ArrayBreadcrumb)