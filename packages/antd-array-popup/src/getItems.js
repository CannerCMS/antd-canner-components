import isNull from "lodash/isNull";
import isArray from "lodash/isArray";
import pick from "lodash/pick";

export default function(schema, action) {
  if (isArray(action)) {
    // action 為一個 array, 指定要選取的 key
    // 從 schema.items 挑選被指定的 schema 並回傳
    return pick(schema.items, action);
  }

  if (isNull(action)) {
    // null 代表不出現該 action 的 button
    // 直接回傳 {}
    return {};
  }
  // default
  // 沒有指定 action 的 key
  // 回傳整個 items 的 schema
  return schema.items;
}
