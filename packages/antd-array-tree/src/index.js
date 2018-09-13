// @flow

import * as React from 'react';
import { Input, Tree, Alert, Button, Icon, Modal } from 'antd';
import AddModal from './addModal';
import EditModal from './editModal';
import update from 'lodash/update';
import { FormattedMessage, injectIntl } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import styled from 'styled-components';
import type {FieldId, FieldItems, GotoFn} from 'types/DefaultProps';
import type {IntlShape} from 'react-intl';

const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
const Search = Input.Search;

const HoverableIcon = styled(Icon)`
  transition: all 300ms;
  visibility: hidden;
  opacity: 0;
  &:hover {
    font-weight: bold;
  }
`

const Title = styled.span`
  transition: all 300ms;

  &:hover {
    i {
      opacity: 1;
      visibility: visible;
    }
  }
`
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
  textCol: string;
  relationField: string;

  constructor(props: Props) {
    super(props);
    const dataList = genDataList(props.value);
    this.textCol = props.uiParams.textCol || props.items.items[props.uiParams.relationField].uiParams.textCol;
    this.relationField = props.uiParams.relationField;
    this.state = {
      treeData: genRelationTree({
        treeData: [],
        treeMap: {},
        data: dataList,
        textCol: this.textCol,
        relationField: this.relationField
      }),
      expandedKeys: [],
      autoExpandParent: true,
      searchValue: '',
      dataList: dataList,
      showEditModal: false,
      showAddModal: false
    }
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    const modalOpen = nextState.showAddModal || nextState.showEditModal;
    const dataList = genDataList(nextProps.value);
    return {
      treeData: modalOpen ?
        nextState.treeData :
        genRelationTree({
          treeData: [],
          treeMap: {},
          data: dataList,
          textCol: nextProps.uiParams.textCol || nextProps.items.items[nextProps.uiParams.relationField].uiParams.textCol,
          relationField: nextProps.uiParams.relationField
        }),
      dataList
    };
  }

  onChange = (e) => {
    const {value} = e.target;
    const {dataList, treeData} = this.state;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }


  confirmDelete = (index: number) => {
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

  render() {
    const {uiParams: {relationField}, items, title, refId, reset, onChange} = this.props;
    const {treeData, autoExpandParent, expandedKeys, searchValue} = this.state;
    const loop = data => data.map((item) => {
      const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <Title>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
          <HoverableIcon style={{marginLeft: 24}} type="edit" onClick={() => this.edit(item)}/>
          <HoverableIcon style={{marginLeft: 8}} type="cross" onClick={() => this.confirmDelete(item.__index)}/>
        </Title>
      ) : (
        <Title>
          {item.title}
          <HoverableIcon style={{marginLeft: 24}} type="edit" onClick={() => this.edit(item)}/>
          <HoverableIcon style={{marginLeft: 8}} type="cross" onClick={() => this.confirmDelete(item.__index)}/>
        </Title>
      );
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={title}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={title} />;
    });
    const addText = (
      <FormattedMessage
        id="array.table.addText"
        defaultMessage={defaultMessage.en["array.table.addText"]}
      />
    );

    return (
      <React.Fragment>
        <div style={{display: 'flex'}}>
          <Search style={{ marginBottom: 10, marginRight: 24 }} placeholder="Search" onChange={this.onChange} />
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
        </div>
        {
          treeData.length ? (
            <Tree
              selectable={false}
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
            >
              {loop(treeData)}
            </Tree>
          ): (
            <Alert
              message="No Data"
              description={`Press the "Add" button to add a new ${title}`}
              type="info"
            />
          )
        }
        <AddModal
          ref={modal => (this.addModal = modal)}
          refId={refId}
          reset={reset}
          updateShowModal={(state) => this.setState({showAddModal: state})}
          onChange={onChange}
          relationField={relationField}
          items={items.items}
        />
        <EditModal
          ref={modal => (this.editModal = modal)}
          refId={refId}
          updateShowModal={(state) => this.setState({showEditModal: state})}
          relationField={relationField}
          onChange={onChange}
          reset={reset}
        />
      </React.Fragment>
    );
  }
}

function genRelationTree({
  data,
  textCol,
  treeData = [],
  treeMap = {},
  relationField
}) {
  const leftData = [];
  JSON.parse(JSON.stringify(data)).forEach(datum => {
    if (!datum) {
      return;
    }
    const parent = datum[relationField];
    if (!parent || !parent.id || datum.id === parent.id) {
      treeMap[datum.id] = `[${treeData.length}]`;
      treeData.push({
        ...datum,
        title: datum[textCol],
        children: [],
        __index: datum.__index
      });
    } else if (treeMap[parent.id]) {
      treeData = update(treeData, treeMap[parent.id], item => {
        treeMap[datum.id] = `${treeMap[parent.id]}.children[${item.children.length}]`;
        item.children.push({
          ...datum,
          title: datum[textCol],
          children: []
        });
        return item;
      });
    } else {
      leftData.push(datum);
    }
  });
  if (leftData.length && data.length === leftData.length) {
    leftData[0][relationField].id = null;
  }
  if (leftData.length) {
    genRelationTree({
      data: leftData,
      textCol,
      treeData,
      treeMap,
      relationField
    })
  }
  return treeData;
}

function getParentKey(key, tree) {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

function genDataList(value: Array<Object>) {
  return value.map((v, i) => ({
    ...v,
    key: v.id,
    __index: i
  }));
}