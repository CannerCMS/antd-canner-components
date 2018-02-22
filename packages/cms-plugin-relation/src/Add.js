// @flow
import React, { PureComponent } from "react";
import { Icon, Button } from "antd";
import type { Map, List } from 'immutable';
import difference from "lodash/difference";
import Picker from './Picker';

type State = {
  modalVisible: boolean
};

type Props = defaultProps & {
  value: Array<Map<string, any>>,
  uiParams: {
    textCol: string,
    subtextCol: string,
    renderText?: string
  }
};

export default class RelationAdd extends PureComponent<Props, State> {
  isOnComposition: boolean;

  constructor(props: Props) {
    super(props);
    this.isOnComposition = false;
    this.state = {
      modalVisible: false
    };
  }

  static defaultProps = {
    uiParams: {}
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  handleOk = (queue: List<any>, originData: any) => {
    let {onChange, id, value} = this.props;
    value = value && value.toJS ? value.toJS() : [];
    queue = queue.toJS();
    const currentIds = value.map(v => v._id);
    const idsShouldCreate = difference(queue, currentIds);
    const idsShouldRemove = difference(currentIds, queue);
    const createActions = idsShouldCreate.map(_id => ({id, type: "create", value: originData.find(data => data.get('_id') === _id)}));
    const delActions = idsShouldRemove.map(_id => ({id: `${id}/${currentIds.findIndex(v => v === _id)}`, type: "delete"}));
    onChange([...createActions, ...delActions]);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = (index:  number) => {
    const {onChange, id} = this.props;
    onChange(`${id}/${index}`, 'delete');
  }

  render() {
    const { modalVisible } = this.state;
    let { readOnly, value, uiParams, renderChildren, id, relation, goTo, baseUrl, rootValue, fetchRelation } = this.props;
    value = value && value.toJS ? value.toJS() : [];
    const recordId = rootValue.getIn([id.split('/')[1], '_id']);
    return (
      <div>
        <Button
          onClick={() => goTo(`${baseUrl}/${relation.relationTo}?op=create&payload=${JSON.stringify({[relation.foreignKey]: {[recordId]: true}})}&backUrl=${encodeURIComponent(location.href)}`)}
        >
          <Icon type="plus" /> 新增物件
        </Button>
        <Button
          onClick={this.showModal}
          style={{ background: '#fff', marginLeft: 8 }}
        >
          <Icon type="check" /> 選取物件
        </Button>

        {
          !readOnly && <Picker
            title="選擇物件"
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            renderChildren={renderChildren}
            pickedIds={value.map(v => v._id)}
            columns={uiParams.columns}
            id={id}
            fetchRelation={fetchRelation}
            relation={relation}
          />
        }
      </div>
    );
  }
}

