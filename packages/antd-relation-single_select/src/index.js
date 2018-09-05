// @flow
import React, { PureComponent } from "react";
import { Tag, Icon } from "antd";
import template from 'lodash/template';
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
    textCol: string,
    subtextCol: string,
    renderText?: string,
    columns: Array<*>
  },
  rootValue: any,
  value: any,
  subscribe: Function,
  disabled: FieldDisabled,
  updateQuery: Function
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
    const { disabled, value, uiParams, refId, relation, fetch, fetchRelation, subscribe, updateQuery, relationValue, Toolbar, toolbar } = this.props;
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
  textCol: string,
  subtextCol: string,
  renderText?: string  
}): string {
  // use value and uiParams to generateTagName
  const {textCol, subtextCol, renderText} = uiParams;
  let tag = '';
  if (renderText) {
    // if there is renderText, textCol and subtextCol will be ignored;
    const compiler = template(renderText);
    try {
      tag = compiler(v);
    } catch (e) {
      throw e;
    }
  } else {
    const text = v[textCol];
    const subtext = v[subtextCol];
    tag = text + (subtext ? `(${subtext})` : '');
  }

  return tag;
}
