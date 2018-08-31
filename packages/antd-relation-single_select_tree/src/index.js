// @flow
import React, { PureComponent } from "react";
import { Tree } from "antd";
import update from 'lodash/update';
import get from 'lodash/get';
import {List} from 'react-content-loader'

const TreeNode = Tree.TreeNode;

export default class RelationTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeData: [],
      data: {
        [props.relation.to]: {
          edges: []
        }
      },
      fetching: false
    }
  }

  componentDidMount() {
    const {updateQuery, relation} = this.props;
    updateQuery([relation.to], {
      pagination: {
        first: 99
      }
    });
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.refId.toString() !== this.props.refId.toString()) {
      this.updateData(this.state.data);
    }
  }

  fetchData = () => {
    const {fetch, relation} = this.props;
    this.setState({
      fetching: true
    });
    fetch(relation.to)
      .then(data => {
        this.updateData(data);
        this.subscribe();
        this.setState({
          fetching: false
        });
      })
      .catch(() => {
        this.setState({
          fetching: false
        });
      })
  }

  subscribe = () => {
    const {subscribe, relation} = this.props;
    this.subscription = subscribe(relation.to, this.updateData);
  }

  updateData = (data) => {
    const {relation, uiParams: {textCol}, keyName} = this.props;
    const treeData = genRelationTree({
      data: JSON.parse(JSON.stringify(get(data, [relation.to, 'edges']).map(edge => edge.node))),
      textCol,
      relationField: keyName
    });
    this.setState({
      treeData,
      data
    });
  }

  onCheck = (v, info) => {
    const checkedKeys = v.checked;
    const nodes = info.checkedNodes;
    const {onChange, refId, value, relation} = this.props;
    const {data} = this.state;
    const originCheckIndex = checkedKeys.indexOf(value && value.id);
    checkedKeys.splice(originCheckIndex, 1);    
    if (checkedKeys[0] && !nodes[0].props.disableCheckbox) {
      const checked = get(data, [relation.to, 'edges'])
        .find(edge => edge.cursor === checkedKeys[0])
        .node;
      onChange(refId, 'connect', checked);
    } else {
      onChange(refId, 'disconnect', value);
    }
  }

  renderTreeNodes = (data, checkedId, selfId, disableCheckbox, id) => {
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
    const { treeData, data, fetching } = this.state;
    const { value, refId, relation } = this.props;
    const [key, index] = refId.getPathArr();
    const checkedId = value && value.id;
    let selfId = null;
    if (key === relation.to) {
      // self relation
      selfId = get(data, [key, 'edges', index, 'cursor']);
    }
    if (fetching) {
      return <List style={{maxWidth: 400}}/>;
    }
    return (
      <Tree
        defaultExpandAll
        checkStrictly
        checkable
        onCheck={this.onCheck}
        checkedKeys={value ? [value.id] : []}
      >
        {this.renderTreeNodes(treeData, checkedId, selfId)}
      </Tree>
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
  if (data.length === leftData.length) {
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