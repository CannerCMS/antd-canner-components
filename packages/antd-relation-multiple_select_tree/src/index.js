// @FlowFlow

import React, { PureComponent } from 'react';
import { Tree, Input } from 'antd';
import update from 'lodash/update';
import get from 'lodash/get';
import difference from 'lodash/difference';
import {List} from 'react-content-loader';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

type State = {
  fetching: boolean,
  expandedKeys: Array<string>,
  autoExpandParent: boolean,
  searchValue: string,
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
      searchValue: '',
      fetching: false
    }
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e, dataList, treeData) => {
    const {value} = e.target;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.id, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
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
    const {searchValue} = this.state;
    return data.map((item, index) => {
      const matchIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, matchIndex);
      const afterStr = item.title.substr(matchIndex + searchValue.length);
      const title = matchIndex > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>
          {item.title}
        </span>
      );
      const isChecked = item.key === checkedId;
      const isSelf = item.key === selfId;
      const newId = id ? `${id}-${index}` : `${index}`;
      const isDisabledByUser = disabled ? disabled(item, newId) : false;
      if (item.children) {
        return (
          <TreeNode title={title} key={item.key} dataRef={item} disableCheckbox={isSelf || disableCheckbox || isDisabledByUser}>
            {this.renderTreeNodes(item.children, checkedId, selfId, isSelf || isChecked || disableCheckbox, newId)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={title} key={item.key} disableCheckbox={isSelf || disableCheckbox || isDisabledByUser}/>;
    });
  }

  render() {
    const {fetching, expandedKeys, autoExpandParent} = this.state;
    const { Toolbar, value, refId, relation, uiParams: {textCol, relationField, checkStrictly}, rootValue } = this.props;
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
            data: key === relation.to ? relationValue.concat(selfItem) : relationValue,
            textCol,
            relationField,
            treeData: [],
            treeMap: {}
          });
          return (
            <React.Fragment>
              <Search style={{ marginBottom: 10, marginRight: 24 }} placeholder="Search" onChange={e => this.onChange(e, relationValue, treeData)} />
              <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                checkable
                multiple
                checkStrictly={checkStrictly}
                onCheck={this.onCheck}
                // $FlowFixMe
                checkedKeys={(value || []).map(v => v.id)}
              >
                {this.renderTreeNodes(treeData, checkedId, selfItem && selfItem.id)}
              </Tree>
            </React.Fragment>
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