// @flow
import * as React from "react";
import { Icon, Table } from "antd";
import difference from "lodash/difference";
import Picker from '@canner/antd-share-relation';
import {renderValue} from '@canner/antd-locales';

// type
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {GotoFn, FieldDisabled} from "../../../types/DefaultProps";
import type {List} from 'immutable';

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
  disabled: FieldDisabled,
  updateQuery: Function,
  subscribe: Function,
  schema: Object,
  Toolbar: React.ComponentType<*>,
  relationValue: List<any>,
};

export default class RelationTable extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
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

  handleOk = (queue: List<any>, originData: List<any>) => {
    let {onChange, refId, value} = this.props;
    value = value && value.toJS ? value.toJS() : [];
    const q = queue.toJS();
    // $FlowFixMe
    const currentIds = value.map(v => v.id);

    const idsShouldCreate = difference(q, currentIds);
    const idsShouldRemove = difference(currentIds, q);
    const createActions = idsShouldCreate.map(id => ({refId, type: "connect", value: originData.find(data => data.get('id') === id)}));
    const delActions = idsShouldRemove.map(id => ({refId, type: "disconnect", value: originData.find(data => data.get('id') === id)}));
    onChange([...createActions, ...delActions]);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = (index: number) => {
    const {onChange, refId, value} = this.props;
    onChange(refId, 'disconnect', value.get(index));
  }

  render() {
    const { modalVisible } = this.state;
    let { disabled, value, uiParams = {}, refId, relation,
      fetch, fetchRelation, updateQuery, subscribe,
      schema, Toolbar, relationValue
    } = this.props;
    value = value && value.toJS ? value.toJS() : [];
    const newColumnsRender = renderValue(uiParams.columns, schema[relation.to].items.items);
    
    return (
      <div>
        <Table
          dataSource={value}
          columns={newColumnsRender}
        />
        {
          !disabled && <div>
            <a href="javascript:;" onClick={this.showModal}>
              <Icon type="link" style={{margin: '16px 8px'}}/>connect existed {relation.to}
            </a>
          </div>
        }
        {
          !disabled && <Picker
            title="選擇你要的物件"
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            // $FlowFixMe
            pickedIds={value.map(v => v.id)}
            columns={uiParams.columns}
            refId={refId}
            relation={relation}
            relationValue={relationValue}
            fetch={fetch}
            subscribe={subscribe}
            updateQuery={updateQuery}
            fetchRelation={fetchRelation}
            Toolbar={Toolbar}
          />
        }
      </div>
    );
  }
}

function getRecordValue(rootValue, refId) {
  const targetRefId = refId.remove();
  return rootValue.getIn(targetRefId.getPathArr());
}