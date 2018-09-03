// @flow

import * as React from 'react';
import { Tree, Alert, Button, Icon, Modal } from 'antd';
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
  showAddModal: boolean
}

@injectIntl
export default class ArrayTree extends React.Component<Props, State> {
  addModal: ?AddModal;
  editModal: ?EditModal;

  constructor(props: Props) {
    super(props);
    this.state = {
      treeData: genRelationTree({
        treeData: [],
        treeMap: {},
        data: props.value.map((v, i) => ({...v, __index: i})),
        textCol: props.uiParams.textCol || props.items.items[props.uiParams.relationField].uiParams.textCol,
        relationField: props.uiParams.relationField
      }),
      showEditModal: false,
      showAddModal: false
    }
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    const modalOpen = nextState.showAddModal || nextState.showEditModal;
    return {
      treeData: modalOpen ?
        nextState.treeData :
        genRelationTree({
          treeData: [],
          treeMap: {},
          data: nextProps.value.map((v, i) => ({...v, __index: i})),
          textCol: nextProps.uiParams.textCol || nextProps.items.items[nextProps.uiParams.relationField].uiParams.textCol,
          relationField: nextProps.uiParams.relationField
        })
    };
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

  render() {
    const {uiParams: {relationField}, items, value, title, refId, reset, onChange} = this.props;
    const {treeData} = this.state;
    console.log({treeData});
    const renderTitle = item => <Title>
      <span style={{fontSize: 16}}>{item.title}</span>
      <HoverableIcon style={{marginLeft: 24}} type="edit" onClick={() => this.editModal && this.editModal.showModal(item.__index)}/>
      <HoverableIcon style={{marginLeft: 8}} type="cross" onClick={() => this.confirmDelete(item.__index)}/>
    </Title>;
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={renderTitle(item)}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={renderTitle(item)} />;
    });
    const addText = (
      <FormattedMessage
        id="array.table.addText"
        defaultMessage={defaultMessage.en["array.table.addText"]}
      />
    );

    return (
      <React.Fragment>
        <Button
          type="primary"
          style={{
            marginBottom: '10px',
            marginLeft: 'auto',
            display: 'block'
          }}
          onClick={() => {
            if (this.addModal) {
              this.addModal.showModal(value.length);
            }
          }}
        >
          {addText}
        </Button>
        {
          treeData.length ? (
            <Tree
              showLine
              selectable={false}
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
  data.forEach(datum => {
    datum = JSON.parse(JSON.stringify(datum));
    if (!datum[relationField]) {
      return ;
    }
    const parentId = datum[relationField].id;
    if (datum.id === parentId || !parentId) {
      treeMap[datum.id] = `[${treeData.length}]`;
      treeData.push({
        ...datum,
        title: datum[textCol],
        key: datum.id,
        children: []
      });
    } else if (treeMap[parentId]) {
      treeData = update(treeData, treeMap[parentId], item => {
        treeMap[datum.id] = `${treeMap[parentId]}.children[${item.children.length}]`;
        item.children.push({
          ...datum,
          title: datum[textCol],
          key: datum.id,
          children: [],
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