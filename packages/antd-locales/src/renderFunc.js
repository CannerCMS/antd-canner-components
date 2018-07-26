/* eslint-disable require-jsdoc */
import {template, get} from "lodash";
import {Icon, Tag} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
export default function(cols, schema) {
  return cols.map(col => {
    const itemSchema = getSchema(schema, col.dataIndex.split('.'));
    if (col.render) {
      return col;
    }

    if (col.renderTemplate) {
      col.render = (text, record) => {
        const compiled = template(col.renderTemplate || '');
        return <div dangerouslySetInnerHTML={{__html: compiled(record)}} />;
      }
    }

    col.render = text => renderField(itemSchema, text);
    return col;
  });
}

function renderField(schema, value) {
  if (!schema) {
    return value;
  }

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
      return (
        <div>
          <img alt="Picture" src={value.url} width="50" height="50"></img>
        </div>
      );
    }
    case 'array': {
      if (schema.items.type === 'object') {
        return value.map(v => renderField(schema.items.items, v));
      }
      if (schema.items.type === 'string') {
        return value.map(str => <Tag key={str}>{str}</Tag>);
      }
      if (schema.items.type === 'image') {
        return value.map(image => renderField(schema.items, image));
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