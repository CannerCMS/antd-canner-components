// @flow

import React, { Component } from "react";
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

type State = {
  showAddModal: boolean
}

const Wrapper = styled.div`
  .antd td {
    white-space: nowrap;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    word-break: initial;
  }
`
export default @injectIntl class TableArrayPlugin extends Component<Props, State> {
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

  update = (text, record) => {
    this.editModal && this.editModal.showModal(record.__index);
  }

  delete = (text, record) => {
    const index = record.__index;
    const {onChange, deploy, refId, value} = this.props;
    onChange(refId.child(index), 'delete').then(() => {
      deploy(refId.getPathArr()[0], value[index].id);
    });
  }

  create = () => {
    const {value} = this.props;
    this.addModal && this.addModal.showModal(value.length);
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
      disabled = {}
    } = this.props;
    const {
      value
    } = this.state;
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
        <EditModal
          ref={modal => (this.editModal = modal)}
          refId={refId}
          updateKeys={uiParams.updateKeys}
          updateShowModal={(state) => this.setState({showEditModal: state})}
          onChange={onChange}
          reset={reset}
        />
        <AddModal
          ref={modal => (this.addModal = modal)}
          refId={refId}
          reset={reset}
          updateShowModal={(state) => this.setState({showAddModal: state})}
          createKeys={uiParams.createKeys}
          onChange={onChange}
          items={items.items}
        />
      </Wrapper>
    );
  }
}
