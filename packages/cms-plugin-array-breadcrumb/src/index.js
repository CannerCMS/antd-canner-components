// @flow

import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import { List, Map } from "immutable";
import renderFunc from "./renderFunc";
import isEmpty from "lodash/isEmpty";
import pick from 'lodash/pick';
import isObject from "lodash/isObject";
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
type Props = defaultProps & {
  value: List<any>,
  uiParams: {
    createAction: Array<string>,
    updateAction: Array<string>,
    columns: Array<{
      title: string,
      key: string,
      dataIndex: number,
      renderTemplate: string
    }>
  },
  baseUrl: string,
  onChange: Function,
  id: string,
  deploy: Function,
  rootValue: any,
  showPagination: boolean
};

type State = {
  relationData: {[string]: any}
}

function findFromItems(items, filter, rtnField, list) {
  list = list || [];
  if (!isObject(items)) {
    return list;
  }
  if (items && filter(items)) {
    try {
      list.push(pick(items, rtnField));
    } catch (e) {
      list.push(items);
      // eslint-disable-next-line
      console.error(e);
    }
    return list;
  }

  if ('items' in items ) {
    list = list.concat(findFromItems(items.items, filter, rtnField));
  } else {
    list = Object.keys(items).reduce((acc, key) => {
      const item = items[key];
      if (isObject(item)) {
        item.__key__ = key;
        return acc.concat(findFromItems(item, filter, rtnField));
      }
      return acc;
    }, list);
  }
  return list;
}

export default class ArrayBreadcrumb extends Component<Props, State> {
  editModal: ?HTMLDivElement;
  addModal: ?HTMLDivElement;
  static defaultProps = {
    value: new List(),
    showPagination: true,
    schema: {}
  };

  componentWillMount() {
    const { fetch } = this.context;
    const { items, id, value } = this.props;
    const relationList = findFromItems(items, schema => {
      return schema.type === 'relation';
    }, ['relation', '__key__']);
    relationList.forEach(item => {
      const { __key__, relation } = item;
      const { relationTo, relationship } = relation;
      let idList = new List();
      value.forEach(v => {
        // $FlowFixMe
        if (relationship === 'oneToMany.idMap') {
          idList = idList.concat(v.get(__key__, new Map()).keySeq().toJS());
        } else {
          idList = idList.concat(v.get(__key__, new List()));
        }
      });
      fetch(relationTo, `${id}/__RELATION__`, {filter: {_id: {$in: idList.toJS()}}, pagination: {start: 0, limit: 40}})
        .then(ctx => {
          const data = ctx.response.body;
          this.setState(state => ({
            relationData: {
              ...state.relationData,
              [__key__]: data && data.toJS ? data.toJS() : []
            }
          }));
        });
    });
  }

  add = () => {
    const {goTo, id, baseUrl} = this.props;
    goTo(`/${baseUrl}/${id}?op=create`);
  }

  edit = (recordId: string) => {
    const {goTo, id, baseUrl} = this.props;
    goTo(`/${baseUrl}/${id}/${recordId}`);
  }

  remove = (index: number) => {
    const {onChange, deploy, id, value} = this.props;
    confirm({
      title: 'Are you sure delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onChange(`${id}/${index}`, 'delete').then(() => {
          deploy(id.split('/')[0], value.getIn([index, '_id']));
        });
      }
    });
    
  }

  render() {
    const {
      id,
      uiParams,
      value,
      onChange,
      showPagination,
      items
    } = this.props;
    const {relationData} = this.state;
    const addText = (
      <FormattedMessage
        id="array.popup.addText"
        defaultMessage={defaultMessage.en["array.popup.addText"]}
      />
    );
    const schema = items.items;
    const schemaKeys = Object.keys(schema);
    let {
      createAction = schemaKeys,
      columns = []
    } = uiParams;

    // push update button and delete button
    const newColumns = columns.slice();
    // 為了向後相容 當 schema.items undefined時
    // 拿 schema.createAction.schema.items
    const newColumnsRender = renderFunc(newColumns, items.items, relationData);
    newColumnsRender.push({
      title: 'Actions',
      dataIndex: "__settings",
      key: "__settings",
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button icon="edit"
              onClick={() => this.edit(record._id)}
            />
            <Button icon="delete"
              onClick={() => this.remove(record.__index)}
            />
          </ButtonGroup>
        );
      }
    });

    return (
      <div>
        <Table
          pagination={showPagination}
          dataSource={value.toJS().map((datum, i) => {
            datum.__index = i;
            datum.key = datum.key || i;
            return datum;
          })}
          columns={newColumnsRender}
        />
        {isEmpty(createAction) ? null : (
          <Button
            type="primary"
            onClick={this.add}
          >
            {addText}
          </Button>
        )}
      </div>
    );
  }
}
