/* eslint-disable require-jsdoc */
import { isBoolean, isArray, template } from "lodash";
import React from 'react';
export default function(cols, schema) {
  return cols.map(col => {
    const itemSchema = schema[col.dataIndex];
    const func = (text, record) => {
      if (text === undefined) {
        return "NULL";
      }

      if (itemSchema && itemSchema.ui === 'image') {
        return <div>
          <img alt="Picture" src={text} width="50" height="50"></img>
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
          <img src={text[0] ? text[0][imageKey] : ''} alt="Picture" width="50" height="50"></img>
          {
            length > 1 ?
            <img src={text[1] ? text[1][imageKey] : ''} alt="Picture" width="50" height="50"></img>
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
                {length} pictures
              </div>
              : null
          }
          </div>;
      }

      if (col.renderTemplate) {
        const compiled = template(col.renderTemplate || '');
        return <div dangerouslySetInnerHTML={{__html: compiled(record)}} />;
      }

      if (isBoolean(text)) {
        if (text) {
          return "True";
        }
        return "False";
      }

      if (isArray(text)) {
        if (text.length > 0) {
          return text.join(", ");
        }

        return "No";
      }

      return text && text.toString();
    };

    col.render = func;
    return col;
  });
}
