/* eslint-disable require-jsdoc */
import { isBoolean, isArray, template, isUndefined, isEmpty } from "lodash";
import React from 'react';
import { Tag } from 'antd';
export default function(cols, schema, relationData) {
  return cols.map(col => {
    const itemSchema = schema[col.dataIndex];
    const func = (text, record) => {
      if (text === undefined) {
        return "無此資料";
      }

      if (itemSchema && itemSchema.ui === 'image') {
        return <div>
          <img alt="無圖片" src={text} width="50" height="50"></img>
        </div>;
      }

      if (itemSchema && itemSchema.ui === 'gallery') {
        const length = text.length;
        const {imageKey = 'src'} = itemSchema.uiParams;
        return <div
            style={{
              display: 'flex'
            }}
          >
          <img src={text[0] ? text[0][imageKey] : ''} alt="無圖片" width="50" height="50"></img>
          {
            length > 1 ?
            <img src={text[1] ? text[1][imageKey] : ''} alt="無圖片" width="50" height="50"></img>
            : null
          }
          {
            length >= 3 ?
              <div style={{
                width: 50,
                height: 50,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: "#ddd"
              }}>
                共 {length} 張
              </div>
              : null
          }
          </div>;
      }

      if (col.renderTemplate) {
        const compiled = template(col.renderTemplate || '');
        return <div dangerouslySetInnerHTML={{__html: compiled(record)}} />;
      }

      if (itemSchema && itemSchema.type === "relation") {
        const {relationTo, relationship} = itemSchema.relation;
        if (relationship === 'oneToMany.idMap') {
          text = Object.keys(text || {});
        } else if (typeof text === 'string') {
          text = [text];
        }
        const item = (relationData[itemSchema.__key__] || []).filter(datum => text.indexOf(datum._id) !== -1);
        let {textCol, subtextCol} = itemSchema.uiParams;
        if (item && item.length === 0) {
          return "";
        }
        if (textCol && (textCol.indexOf('<%') === -1 || textCol.indexOf('%>') === -1)) {
          // not template string
          // change it
          textCol = `<%=${textCol}%>`;
        }
        if (subtextCol && (subtextCol.indexOf('<%') === -1 || subtextCol.indexOf('%>') === -1)) {
          // not template string
          // change it
          subtextCol = `<%=${subtextCol}%>`;
        }
        const textCompiled = template(textCol || '');
        const subtextCompiled = template(subtextCol || '');
        
        
        const texts = item.map(value => {
          let title = '';
          let subText = '';
          try {
            title = textCompiled(value);
            subText = subtextCompiled(value);
          } catch (e) {
            title = '';
            subText = '';
          }
          return `${title} ${subText ? `(${subText})` : ""}`;
        })
        return <div>
          {texts.map(text => {
            const isLongTag = text.length > 10;
            return <Tag key={text} closable={false}>
              {isLongTag ? `${text.slice(0, 10)}...` : text}
            </Tag>
          })}
        
        </div>
      }

      if (isBoolean(text)) {
        if (text) {
          return "是";
        }
        return "否";
      }

      if (isArray(text)) {
        if (text.length > 0) {
          return text.join(", ");
        }

        return "無";
      }

      return text && text.toString();
    };

    col.render = func;
    return col;
  });
}
