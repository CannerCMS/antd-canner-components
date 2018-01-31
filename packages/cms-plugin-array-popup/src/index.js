// @flow

import React, { Component } from "react";
import { Table, Button } from "antd";
import { List, Map } from "immutable";
import renderFunc from "./renderFunc";
import showDeleteConfirm from "./showDeleteConfirm";
import PropTypes from "prop-types";
import EditModal from "./editModal";
import AddModal from "./addModal";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/cms-locales";

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
  rootValue: any,
  showPagination: boolean
};

type State = {
  relationData: ?{[string]: any}
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

export default class PopupArrayPlugin extends Component<Props, State> {
  editModal: ?HTMLDivElement;
  addModal: ?HTMLDivElement;
  static defaultProps = {
    value: new List(),
    showPagination: true,
    schema: {}
  };

  static contextTypes = {
    fetch: PropTypes.func,
    deploy: PropTypes.func
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      relationData: {}
    }
  }

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

  render() {
    const {
      id,
      uiParams,
      value,
      onChange,
      createEmptyData,
      renderChildren,
      showPagination,
      items,
      rootValue,
      query
    } = this.props;
    const {relationData} = this.state;
    const {deploy} = this.context;
    const editText = (
      <FormattedMessage
        id="array.popup.editText"
        defaultMessage={defaultMessage.en["array.popup.editText"]}
      />
    );
    const deleteText = (
      <FormattedMessage
        id="array.popup.deleteText"
        defaultMessage={defaultMessage.en["array.popup.deleteText"]}
      />
    );
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
      updateAction = schemaKeys,
      deleteAction = true,
      columns = []
    } = uiParams;

    // push update button and delete button
    const newColumns = columns.slice();
    // 為了向後相容 當 schema.items undefined時
    // 拿 schema.createAction.schema.items
    const newColumnsRender = renderFunc(newColumns, items.items, relationData || {});
    if (!isEmpty(updateAction)) {
      newColumnsRender.push({
        title: editText,
        dataIndex: "__settings",
        key: "__settings",
        render: (text, record) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                if (this.editModal)
                  this.editModal.showModal(value, record.__index);
              }}
            >
              {editText}
            </Button>
          );
        }
      });
    }

    if (deleteAction !== false && !isNull(deleteAction)) {
      newColumnsRender.push({
        title: deleteText,
        dataIndex: "__delete",
        key: "__delete",
        render: (text, record) => {
          return (
            <Button
              type="ghost"
              onClick={() =>
                showDeleteConfirm({
                  id,
                  onChange,
                  deploy,
                  order: record.__index
                })
              }
            >
              {deleteText}
            </Button>
          );
        }
      });
    }
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
            onClick={() => {
              if (this.addModal)
                this.addModal.showModal(value, value.size);
            }}
          >
            {addText}
          </Button>
        )}
        <EditModal
          ref={modal => (this.editModal = modal)}
          id={id}
          renderChildren={renderChildren}
          updateAction={updateAction}
          onChange={onChange}
          rootValue={rootValue}
          query={query}
        />
        <AddModal
          ref={modal => (this.addModal = modal)}
          id={id}
          renderChildren={renderChildren}
          createAction={createAction}
          onChange={onChange}
          items={items.items}
          createEmptyData={createEmptyData}
          rootValue={rootValue}
          query={query}
        />
      </div>
    );
  }
}
