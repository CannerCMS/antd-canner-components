// @flow

import React, { Component } from "react";
import Table from '@canner/antd-share-table';
import PropTypes from 'prop-types';
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

type State = {
  selectedRowKeys: Array<string>
}


export default @injectIntl class ArrayBreadcrumb extends Component<Props, State> {
  static defaultProps = {
    value: [],
    schema: {}
  };

  static contextTypes = {
    fetch: PropTypes.func
  }

  create = () => {
    const {goTo, refId} = this.props;
    goTo({pathname: refId.toString(), operator: 'create'});
  }

  update = (text: string, record: Object) => {
    const {goTo, refId} = this.props;
    goTo({pathname:`${refId.toString()}/${record.id}`});
  }

  delete = (text: string, record: number) => {
    const {onChange, deploy, refId, value} = this.props;
    const index = record.__index;
    onChange(refId.child(index), 'delete').then(() => {
      deploy(refId.getPathArr()[0], value[index].id);
    });
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
      rootValue,
      disabled
    } = this.props;
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
          delete={this.delete}
          create={this.create}
          update={this.update}
        />
      </Wrapper>
    );
  }
}
