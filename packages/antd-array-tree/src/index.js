// @flow

import * as React from 'react';
import {Modal} from 'antd';
import AddModal from './addModal';
import EditModal from './editModal';
import { injectIntl } from "react-intl";
import Toolbar from '@canner/antd-share-toolbar';

import Tree from './tree';

import type {FieldId, FieldItems, GotoFn} from 'types/DefaultProps';
import type {IntlShape} from 'react-intl';

const confirm = Modal.confirm;

type Props = {
  refId: FieldId,
  items: FieldItems,
  goTo: GotoFn,
  value: Array<any>,
  uiParams: {
    textCol: string,
    relationField: string
  },
  onChange: Function,
  deploy: Function,
  showPagination: boolean,
  keyName: string,
  intl: IntlShape,
  title: string,
  reset: Function,
};

type State = {
  treeData: Array<Object>,
  showEditModal: boolean,
  showAddModal: boolean,
  dataList: Array<Object>,
  expandedKeys: Array<string>,
  autoExpandParent: boolean,
  searchValue: string,
}

@injectIntl
export default class ArrayTree extends React.Component<Props, State> {
  addModal: ?AddModal;
  editModal: ?EditModal;

  constructor(props: Props) {
    super(props);
    this.state = {
      showEditModal: false,
      showAddModal: false
    }
  }

  add = () => {
    const {value, uiParams = {}, refId, goTo} = this.props;
    const popup = 'popup' in uiParams ? uiParams.popup : true;
    if (popup) {
      this.addModal && this.addModal.showModal(value.length);
    } else {
      goTo({pathname: refId.toString(), operator: 'create'});
    }
  }

  edit = item => {
    const {uiParams = {}, refId, goTo} = this.props;
    const popup = 'popup' in uiParams ? uiParams.popup : true;
    if (popup) {
      this.editModal && this.editModal.showModal(item.__index)
    } else {
      goTo({pathname:`${refId.toString()}/${item.id}`});
    }
  }

  delete = index => {
    const {onChange, refId, keyName, deploy, intl} = this.props;
    confirm({
      title: intl.formatMessage({ id: "array.table.delete.confirm" }),
      onOk: () => {
        onChange(refId.child(index), "delete")
          .then(() => {
            if(deploy) {
              deploy(keyName);
            }
          })
      }
    });
  }

  render() {
    const {uiParams, title, items, value, refId, reset, onChange, toolbar} = this.props;
    const {showAddModal, showEditModal} = this.state;
    return (
      <React.Fragment>
        <Toolbar
          toolbar={{...toolbar, pagination: false}}
          dataSource={value}
        >
          {
            ({value}) => {
              return <Tree
                add={this.add}
                edit={this.edit}
                remove={this.delete}
                value={value}
                uiParams={uiParams}
                title={title}
                items={items}
                showAddModal={showAddModal}
                showEditModal={showEditModal}
              />
            }
          }
        </Toolbar>
        <AddModal
          ref={modal => (this.addModal = modal)}
          refId={refId}
          reset={reset}
          updateShowModal={(state) => this.setState({showAddModal: state})}
          onChange={onChange}
          relationField={uiParams.relationField}
          items={items.items}
        />
        <EditModal
          ref={modal => (this.editModal = modal)}
          refId={refId}
          updateShowModal={(state) => this.setState({showEditModal: state})}
          relationField={uiParams.relationField}
          onChange={onChange}
          reset={reset}
        />
      </React.Fragment>
    );
  }
}
