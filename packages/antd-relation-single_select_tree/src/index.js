// @flow
import React, { PureComponent } from "react";
import { Tree } from "antd";
import update from 'lodash/update';
import get from 'lodash/get';
import {List} from 'react-content-loader'
import type {RelationDefaultProps} from 'types/RelationDefaultProps';

const TreeNode = Tree.TreeNode;

type State = {
  fetching: boolean
};

type Props = RelationDefaultProps & {
  uiParams: {
    textCol: string,
    relationField: string,
    disabled: (data: Object, key: string) => boolean
  },
  value: any,
  relationValue: any,
  keyName: string
};

export default class RelationTree extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      fetching: false
    }
  }

  onCheck = (v: Object, info: Object) => {
    const checkedKeys = v.checked;
    const nodes = info.checkedNodes;
    const {onChange, refId, value, relationValue} = this.props;
    // $FlowFixMe
    const originCheckIndex = checkedKeys.indexOf(value && value.id);
    if (originCheckIndex !== -1) {
      checkedKeys.splice(originCheckIndex, 1);    
    }


    if (checkedKeys[0] && !nodes[0].props.disableCheckbox) {
      const checked = get(relationValue, ['edges'])
        .find(edge => edge.cursor === checkedKeys[0])
        .node;

      onChange(refId, 'connect', checked);
    } else {
      onChange(refId, 'disconnect', value);
    }
  }

  renderTreeNodes = (data: Array<Object>, checkedId: Array<string>, selfId: ?string, disableCheckbox: ?boolean, id: ?string) => {
    const {uiParams: {disabled}} = this.props;
    return data.map((item, index) => {
      const isChecked = item.key === checkedId;
      const isSelf = item.key === selfId;
      const newId = id ? `${id}-${index}` : `${index}`;
      const isDisabledByUser = disabled ? disabled(item, newId) : false;
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} disableCheckbox={isSelf || disableCheckbox || isDisabledByUser}>
            {this.renderTreeNodes(item.children, checkedId, selfId, isSelf || isChecked || disableCheckbox, newId)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} key={item.key} disableCheckbox={isSelf || disableCheckbox || isDisabledByUser}/>;
    });
  }

  render() {
    const {fetching} = this.state;
    const { Toolbar, value, refId, relation, uiParams: {textCol, relationField}, rootValue } = this.props;
    const [key, index] = refId.getPathArr();
    // $FlowFixMe
    const checkedId = value && value.id;
    const selfItem = rootValue[key][index];
    if (fetching) {
      return <List style={{maxWidth: 400}}/>;
    }

    return (
      <Toolbar>
        {relationValue => {
          const treeData = genRelationTree({
            data: relation.to === key ? relationValue.concat(selfItem) : relationValue,
            textCol,
            relationField,
            treeData: [],
            treeMap: {}
          });
          return (
            <Tree
              defaultExpandAll
              checkStrictly
              checkable
              onCheck={this.onCheck}
              // $FlowFixMe
              checkedKeys={value ? [value.id] : []}
            >
              {this.renderTreeNodes(treeData, checkedId, selfItem && selfItem.id)}
            </Tree>
          )
        }}
      </Toolbar>
      
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
        title: datum[textCol],
        key: datum.id,
        children: []
      });
    } else if (treeMap[parent.id]) {
      treeData = update(treeData, treeMap[parent.id], item => {
        treeMap[datum.id] = `${treeMap[parent.id]}.children[${item.children.length}]`;
        item.children.push({
          title: datum[textCol],
          key: datum.id,
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
