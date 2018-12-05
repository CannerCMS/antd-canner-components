/* eslint-disable require-jsdoc */
import {isBoolean} from "lodash";
import {Icon, Tag, Avatar, Badge} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
export default function(cols, schema, otherProps) {
  return cols.map(col => {
    const itemSchema = getSchema(schema, col.dataIndex.split('.'));
    if (col.render) {
      // pass canner props into each column in table.
      if (otherProps) {
        const oldRender = col.render;
        col.render = (text, record) => oldRender(text, record, otherProps);
      }
      return col;
    }

    col.render = text => renderField(itemSchema, text);
    return col;
  });
}

function renderField(schema, value) {
  if (!schema) {
    return value;
  }

  // show '-' is no value.
  if (!value && !isBoolean(value)) return '-';
  switch (schema.type) {
    case 'boolean': {
      if (value) {
        return (<Icon type="check" />)
      }
      return <Icon type="close" />
    }
    case 'number': {
      return value;
    }
    case 'string': {
      return value;
    }
    case 'dateTime': {
      return dayjs(value).format('YYYY/MM/DD HH:mm');
    }
    case 'image': {
      if (!value.url) return '-';
      return (
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundImage: `url(${value.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      );
    }
    case 'array': {
      if (schema.ui === 'gallery') {
        const imageKey = (schema.uiParams && schema.uiParams.imageKey) || 'image';
        if (value && value.length > 0) {
          return (
            <Badge count={value.length}>
              <Avatar src={value[0][imageKey].url} shape="square"/>
            </Badge>
          );
        }
        return '-'
      }
      if (schema.items.type === 'object') {
        return value.map(v => renderField(schema.items.items, v));
      }
      if (schema.items.type === 'string') {
        return value.map(str => <Tag key={str}>{str}</Tag>);
      }
      if (schema.items.type === 'image') {
        return value.slice(0, 3).map(image => renderField(schema.items, image));
      }
    }
    return null;
  }
}

function getSchema(schema, dataIndex) {
  if (!dataIndex || dataIndex.length === 0) {
    return schema;
  }

  if (!('type' in schema) || typeof schema.type !== 'string') {
    const key = dataIndex[0];
    return getSchema(schema[key], dataIndex.slice(1));
  }

  if (schema.type === 'object') {
    return getSchema(schema.items, dataIndex);
  }

  if (schema.type === 'array') {
    return getSchema(schema.items, dataIndex);
  }

  return undefined;
}