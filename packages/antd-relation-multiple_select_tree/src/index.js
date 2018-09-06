// @FlowFlow

import React, { PureComponent } from 'react';
import { Tree } from 'antd';
import update from 'lodash/update';
import get from 'lodash/get';
import difference from 'lodash/difference';
import {List} from 'react-content-loader';

const TreeNode = Tree.TreeNode;

type State = {
  fetching: boolean
};

type Props = {
  uiParams: {
    textCol: string,
    relationField: string,
    disabled: (data: Object, key: string) => boolean,
    checkStrictly: boolean
  },
  value: any,
  relationValue: any,
  keyName: string
};

export default class MultipleRelationTree extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      fetching: false
    }
  }

  onCheck = (checkedKeys: Object) => {
    const {onChange, refId, value, relationValue} = this.props;
    const allNodes = relationValue.edges.map(edge => edge.node);
    // $FlowFixMe
    const originIds = value.map(v => v.id);
    const connectKeys = difference(checkedKeys, originIds);
    const disconnectKeys = difference(originIds, checkedKeys);

    connectKeys.forEach((key) => {
      onChange(refId, 'connect', allNodes.find(v => v.id === key));
    });
    disconnectKeys.forEach((key) => {
      onChange(refId, 'disconnect', allNodes.find(v => v.id === key));
    });
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
    const { Toolbar, value, refId, relation, uiParams: {textCol, relationField, checkStrictly} } = this.props;
    const [key, index] = refId.getPathArr();
    // $FlowFixMe
    const checkedId = value && value.id;
    let selfId = null;
    
    if (fetching) {
      return <List style={{maxWidth: 400}}/>;
    }
    // const treeData = genRelationTree({
    //   data: JSON.parse(JSON.stringify(get(relationValue, ['edges']).map(edge => edge.node))),
    //   textCol,
    //   relationField: keyName,
    //   treeData: [],
    //   treeMap: {}
    // });
    return (
      <Toolbar>
        {relationValue => {
          const treeData = genRelationTree({
            data: relationValue,
            textCol,
            relationField,
            treeData: [],
            treeMap: {}
          });
          if (key === relation.to) {
            // self relation
            selfId = get(relationValue, [index, 'id']);
          }
          return (
            <Tree
              defaultExpandAll
              checkable
              multiple
              checkStrictly={checkStrictly}
              onCheck={this.onCheck}
              // $FlowFixMe
              checkedKeys={(value || []).map(v => v.id)}
            >
              {this.renderTreeNodes(treeData, checkedId, selfId)}
            </Tree>
          );
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
    if (!datum[relationField]) {
      return ;
    }
    const parentId = datum[relationField].id;
    if (datum.id === parentId || !parentId) {
      treeMap[datum.id] = `[${treeData.length}]`;
      treeData.push({
        title: datum[textCol],
        key: datum.id,
        children: []
      });
    } else if (treeMap[parentId]) {
      treeData = update(treeData, treeMap[parentId], item => {
        treeMap[datum.id] = `${treeMap[parentId]}.children[${item.children.length}]`;
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