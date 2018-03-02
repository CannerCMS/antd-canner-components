// @flow
import React, { PureComponent } from "react";
import { Tag, Icon } from "antd";
import type { Map, List } from 'immutable';
import template from 'lodash/template';
import Picker from './Picker';
import defaultMessage from "@canner/cms-locales";
import { FormattedMessage } from "react-intl";

type State = {
  modalVisible: boolean
};

type Props = defaultProps & {
  value: Map<string, any>,
  uiParams: {
    textCol: string,
    subtextCol: string,
    renderText?: string
  }
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

  handleOk = (queue: List<any>) => {
    const {onChange, id} = this.props;
    // get the first, and only one from picker
    onChange(id, 'update', queue.get(0));
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleClose = () => {
    const {onChange, id} = this.props;
    onChange(id, 'update', null);
  }

  render() {
    const { modalVisible } = this.state;
    const { readOnly, value, uiParams, renderChildren, id, relation } = this.props;
    return (
      <div>
        {
          value && value.size ?
            <Tag key={value.getIn([0, "_id"])} closable={true} afterClose={this.handleClose}>
              {getTag(value.toJS()[0], uiParams)}
            </Tag> :
            null
        }
        <Tag
          onClick={this.showModal}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="edit" />
          <FormattedMessage 
            id="relation.one.change"
            tagName="span"
            defaultMessage={defaultMessage.en["relation.one.change"]}
          />
        </Tag>
        {
          !readOnly && <Picker
            title={
              <FormattedMessage 
                id="relation.one.choose"
                tagName="span"
                defaultMessage={defaultMessage.en["relation.one.choose"]}
              />
            }
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            renderChildren={renderChildren}
            pickOne={true}
            pickedIds={[value && value.getIn([0, "_id"])]}
            columns={uiParams.columns}
            id={id}
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
