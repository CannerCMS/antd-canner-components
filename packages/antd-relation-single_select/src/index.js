// @flow
import React, { PureComponent } from "react";
import { Tag, Icon } from "antd";
import template from 'lodash/template';
import get from 'lodash.get';
import Picker from '@canner/antd-share-relation';
import {FormattedMessage} from 'react-intl';

// type 
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {FieldDisabled} from 'types/DefaultProps';

type State = {
  modalVisible: boolean
};

type Props = RelationDefaultProps & {
  uiParams: {
    textCol: string | any => string,
    columns: Array<*>
  },
  rootValue: any,
  value: any,
  subscribe: Function,
  disabled: FieldDisabled,
  updateQuery: Function,
  rootValue: Object
};

export default class RelationOneId extends PureComponent<Props, State> {
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

  handleOk = (queue: Array<any>, originData: Array<any>) => {
    const {onChange, refId} = this.props;
    // get the first one from picker
    onChange(refId, 'connect', originData.find(item => item.id === queue[0]));
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = () => {
    const {onChange, refId, value} = this.props;
    onChange(refId, 'disconnect', value);
  }

  render() {
    const { modalVisible } = this.state;
    const { disabled, value, uiParams, refId, relation, fetch, fetchRelation, subscribe, updateQuery, relationValue, Toolbar, toolbar, rootValue } = this.props;
    return (
      <div>
        {
          value &&
            <Tag key={value.id} closable={true} afterClose={this.handleClose} style={{fontSize: 16}}>
              {/* $FlowFixMe */}
              {getTag(value, uiParams)}
            </Tag>
        }
        <Tag
          onClick={this.showModal}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="edit" />
          <FormattedMessage
            id="relation.singleSelect.change"
            defaultMessage="Change"
          />
        </Tag>
        {
          !disabled && <Picker
            rootValue={rootValue}
            fetch={fetch}
            subscribe={subscribe}
            fetchRelation={fetchRelation}
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            updateQuery={updateQuery}
            pickOne={true}
            relationValue={relationValue}
            Toolbar={Toolbar}
            toolbar={toolbar}
            // $FlowFixMe
            pickedIds={[value && value.id]}
            columns={uiParams.columns}
            refId={refId}
            relation={relation}
          />
        }
      </div>
    );
  }
}

function getTag(v: {[string]: any}, uiParams: {
  textCol: string | any => string
}): string {
  const {textCol} = uiParams;
  const type = typeof textCol;
  if (type === 'function') {
    return textCol(v);
  }
  if (type === 'string') {
    return get(v, textCol);
  }
  return textCol;
}
