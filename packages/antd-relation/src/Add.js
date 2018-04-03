// @flow
import React, { PureComponent } from "react";
import { Icon, Button, Table } from "antd";
import difference from "lodash/difference";
import Picker from './Picker';

// type
import type {List} from 'immutable';
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {GotoFn, FieldDisabled} from "../../../types/DefaultProps";

type State = {
  modalVisible: boolean
};

type Props = RelationDefaultProps & {
  uiParams: {
    textCol: string,
    subtextCol: string,
    renderText?: string,
    columns: Array<*>
  },
  goTo: GotoFn,
  rootValue: any,
  disabled: FieldDisabled
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

  componentWillMount() {
    const {fetchRelation} = this.props;
    if (fetchRelation) {
      fetchRelation(null, {start: 0, limit: 999999});
    }
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
    let {onChange, refId, value} = this.props;
    value = value && value.toJS ? value.toJS() : [];
    queue = (queue.toJS(): any);
    const currentIds = value.map(v => (v: any)._id);
    const idsShouldCreate = difference(queue, currentIds);
    const idsShouldRemove = difference(currentIds, queue);
    const createActions = idsShouldCreate.map(_id => ({refId, type: "create", value: originData.find(data => data.get('_id') === _id)}));
    const delActions = idsShouldRemove.map(_id => ({refId: refId.child(`${currentIds.findIndex(v => v === _id)}`), type: "delete"}));
    onChange([...createActions, ...delActions]);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = (index:  number) => {
    const {onChange, refId} = this.props;
    onChange(refId.child(index), 'delete');
  }

  render() {
    const { modalVisible } = this.state;
    let { disabled, value, uiParams, refId, relation, goTo, rootValue, fetchRelation } = this.props;
    value = value && value.toJS ? value.toJS() : [];
    const recordId = rootValue.getIn([refId.getPathArr()[1], '_id']);
    return (
      <div>
        <Button
          onClick={() => goTo(`${relation.relationTo}?op=create&payload=${JSON.stringify({[relation.foreignKey || relation.relationTo]: {[recordId]: true}})}&backUrl=${encodeURIComponent(location.href)}`)}
        >
          <Icon type="plus" /> 新增物件
        </Button>
        <Button
          onClick={this.showModal}
          style={{ background: '#fff', marginLeft: 8 }}
        >
          <Icon type="check" /> 選取物件
        </Button>
        <div style={{ marginTop: 16 }}>
          <Table
            columns={uiParams.columns.map(col => {
              (col: any).render = text => text || '未命名';
              return col;
            })}
            dataSource={value}
            bordered
            size="small"
          />
        </div>
        {
          !disabled && <Picker
            title="選擇物件"
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            // $FlowFixMe
            pickedIds={value.map(v => v._id)}
            columns={uiParams.columns}
            refId={refId}
            fetchRelation={fetchRelation}
            relation={relation}
          />
        }
      </div>
    );
  }
}
