// @flow
import React, { PureComponent } from "react";
import { Tag, Tooltip, Icon } from "antd";
import template from 'lodash/template';
import difference from "lodash/difference";
import Picker from '@canner/antd-share-relation';

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
  disabled: FieldDisabled,
  updateQuery: Function,
  subscribe: Function
};

export default class RelationIdList extends PureComponent<Props, State> {
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
    let {onChange, refId, value} = this.props;
    value = value && value.toJS ? value.toJS() : [];
    queue = (queue.toJS(): any);
    // $FlowFixMe
    const currentIds = value.map(v => v.id);

    const idsShouldCreate = difference(queue, currentIds);
    const idsShouldRemove = difference(currentIds, queue);
    const createActions = idsShouldCreate.map(id => ({refId, type: "connect", value: originData.find(data => data.get('id') === id)}));
    const delActions = idsShouldRemove.map(id => ({refId: refId.child(`${currentIds.findIndex(v => v === id)}`), type: "disconnect", value: originData.find(data => data.get('id') === id)}));
    onChange([...createActions, ...delActions]);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = (index:  number) => {
    const {onChange, refId, value} = this.props;
    onChange(refId, 'disconnect', value.get(index));
  }

  render() {
    const { modalVisible } = this.state;
    let { disabled, value, uiParams, refId, relation, fetch, fetchRelation, updateQuery, subscribe } = this.props;
    value = value && value.toJS ? value.toJS() : [];
    return (
      <div>
        {value.map((v, index) => {
          // $FlowFixMe
          const tag = getTag(v, uiParams);
          const isLongTag = tag.length > 20;
          const tagElem = (
            // $FlowFixMe
            <Tag key={v.id} closable={true} afterClose={() => this.handleClose(index)} style={{fontSize: 16}}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
            // $FlowFixMe
          return isLongTag ? <Tooltip title={tag} key={v.id}>{tagElem}</Tooltip> : tagElem;
        })}
        <Tag
          onClick={this.showModal}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="plus" /> New Tag
        </Tag>
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
            fetch={fetch}
            subscribe={subscribe}
            updateQuery={updateQuery}
            fetchRelation={fetchRelation}
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
