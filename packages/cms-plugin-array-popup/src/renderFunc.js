/* eslint-disable require-jsdoc */
import { isBoolean, isArray, template } from "lodash";
import React from 'react';
export default function(cols, schema) {
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

      // if (itemSchema && itemSchema.ui === "assoc.select") {
      //   const {path} = itemSchema.association;
      //   const item = (assocData[path] || []).find(datum => datum._id === text);
      //   let {textCol, subtextCol} = itemSchema.uiParams;
      //   if (isUndefined(item) || isEmpty(item) || item && item.size === 0) {
      //     return "";
      //   }
      //   if (textCol && (textCol.indexOf('<%') === -1 || textCol.indexOf('%>') === -1)) {
      //     // not template string
      //     // change it
      //     textCol = `<%=${textCol}%>`;
      //   }
      //   if (subtextCol && (subtextCol.indexOf('<%') === -1 || subtextCol.indexOf('%>') === -1)) {
      //     // not template string
      //     // change it
      //     subtextCol = `<%=${subtextCol}%>`;
      //   }
      //   const textCompiled = template(textCol || '');
      //   const subtextCompiled = template(subtextCol || '');
      //   let title = '';
      //   let subText = '';
      //   try {
      //     title = textCompiled(item);
      //     subText = subtextCompiled(item);
      //   } catch (e) {
      //     title = '';
      //     subText = '';
      //   }
      //   return `${title} ${subText ? `(${subText})` : ""}`;
      // }

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
