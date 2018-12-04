// @flow
import * as React from "react";
import { Icon, Table } from "antd";
import difference from "lodash/difference";
import Picker from '@canner/antd-share-relation';
import {renderValue, getIntlMessage} from '@canner/antd-locales';
import {FormattedMessage} from "react-intl";
// type
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {GotoFn, FieldDisabled} from "../../../types/DefaultProps";

type State = {
  modalVisible: boolean
};

type Props = RelationDefaultProps & {
  uiParams: {
    columns: Array<*>,
    connectName: string,
    icon: string | React.Node
  },
  intl: Object,
  goTo: GotoFn,
  rootValue: any,
  disabled: FieldDisabled,
  updateQuery: Function,
  subscribe: Function,
  schema: Object,
  Toolbar: React.ComponentType<*>,
  relationValue: Array<any>,
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

  handleOk = (queue: Array<any>, originData: Array<any>) => {
    let {onChange, refId, value} = this.props;
    value = value || [];
    const q = queue.slice();
    // $FlowFixMe
    const currentIds = value.map(v => v.id);

    const idsShouldCreate = difference(q, currentIds);
    const idsShouldRemove = difference(currentIds, q);
    const createActions = idsShouldCreate.map(id => ({refId, type: "connect", value: originData.find(data => data.id === id)}));
    const delActions = idsShouldRemove.map(id => ({refId, type: "disconnect", value: originData.find(data => data.id === id)}));
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
    onChange(refId, 'disconnect', value[index]);
  }

  render() {
    const { modalVisible } = this.state;
    let { disabled, value, uiParams = {}, refId, relation,
      fetch, fetchRelation, updateQuery, subscribe, intl,
      schema, Toolbar, relationValue, toolbar, rootValue
    } = this.props;
    value = value || [];
    const newColumns = uiParams.columns.map(column => {
      return {...column, title: getIntlMessage(intl, column.title)};
    });
    const newColumnsRender = renderValue(newColumns, schema[relation.to].items.items);
    const {icon} = uiParams;
    return (
      <div>
        <Table
          dataSource={value}
          columns={newColumnsRender}
          size="middle"
        />
        {
          !disabled && <div>
            <a href="javascript:;" onClick={this.showModal}>
              {
                !icon || typeof icon === 'string' ?
                  <Icon type={icon || 'link'} style={{margin: '16px 8px'}}/> :
                  icon
              }
              
              <FormattedMessage
                id="relation.multipleSelect.connect"
                defaultMessage="connect existing "
              />
              {uiParams.connectName || schema[relation.to].title}
            </a>
          </div>
        }
        {
          !disabled && <Picker
            rootValue={rootValue}
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            toolbar={toolbar}
            // $FlowFixMe
            pickedIds={value.map(v => v.id)}
            columns={newColumnsRender}
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
