// @flow
import renderFunc from './renderFunc';

export const renderValue = renderFunc;

export default {
  en: {
    "array.panel.delete.confirm": "Are you sure to delete this item?",
    "array.panel.item": "Item",
    "array.tab.delete.confirm": "Are you sure to delete this item?",
    "array.tab.item": "Item",
    "array.gallery.delete.confirm": "Are you sure to delete this item?",
    "array.table.actions": "Actions",
    "array.table.addText": "Add",
    "array.table.modal.okText": "OK",
    "array.table.modal.cancelText": "Cancel",
    "array.table.delete.confirm": "Are you sure to delete this item?",
    "array.tag.defaultoption": "uncategorized",
    "array.tag.placeholder": "Please pick a category",
    "boolean.switch.yesText": "yes",
    "boolean.switch.noText": "no",
    "object.map.address.sureText": "Enter",
    "object.map.address.latText": "Lat",
    "object.map.address.lngText": "Lng",
    "object.map.suggest.word": "Please select an address from the dropdown menu after inputing an address so that we can locate it.",
    "object.variants.addVariants": "Add variants",
    "object.variants.select.placeholder": "Please enter the select items",
    "object.variants.select": "Selected",
    "object.variants.variantsName": "Category Name",
    "object.variants.table.title": "Name",
    "string.link.preview": "preview link: ",
    "string.datetimepicker.placeholder": "Select date",
    "string.timepicker.placeholder": "Select time",
    "string.select.placeholder": "Select a item",
    "string.image.add": "add Image",
    "relation.singleSelect.change": "Change",
    "relation.multipleSelect.connect": "connect existing ",
    "query.numberRange.placeholder": "Enter number",
    "query.sort.placeholder": "Sort By",
    "query.filter.text.placeholder": "Filter by",
    "query.filter.select.placeholder": "Filter by",
    "query.actions.export": "Export",
    "query.actions.import": "Import",
    "query.actions.filter": "Add Filter"
  },
  zh: {
    "array.panel.delete.confirm": "您確定要刪除這個類別嗎？",
    "array.panel.item": "項目",
    "array.tab.delete.confirm": "您確定要刪除這個類別嗎？",
    "array.tab.item": "項目",
    "array.gallery.delete.confirm": "您確定要刪除這個照片嗎？",
    "array.table.actions": "操作",
    "array.table.addText": "新增",
    "array.table.modal.okText": "確認",
    "array.table.modal.cancelText": "取消",
    "array.table.delete.confirm": "您確定要刪除這個類別嗎？",
    "array.tag.defaultoption": "未分類",
    "array.tag.placeholder": "請選擇分類",
    "boolean.switch.yesText": "是",
    "boolean.switch.noText": "否",
    "object.map.address.sureText": "確定",
    "object.map.address.latText": "緯度",
    "object.map.address.lngText": "經度",
    "object.map.suggest.word": "輸入完地址後請從下拉式選單選擇一個地址，我們才能正確幫你定位喔。",
    "object.variants.addVariants": "增加型號",
    "object.variants.select.placeholder": "請輸入選擇項目",
    "object.variants.select": "選擇",
    "object.variants.variantsName": "型號名稱",
    "object.variants.table.title": "名稱",
    "string.link.preview": "預覽連結: ",
    "string.datetimepicker.placeholder": "請選擇日期",
    "string.timepicker.placeholder": "請選擇時間",
    "string.select.placeholder": "請選擇項目",
    "string.image.add": "新增圖片",
    "relation.singleSelect.change": "更改",
    "relation.multipleSelect.connect": "連結到已存在的",
    "query.numberRange.placeholder": "輸入數字",
    "query.sort.placeholder": "排序依照",
    "query.filter.text.placeholder": "輸入過濾條件",
    "query.filter.select.placeholder": "輸入過濾條件",
    "query.actions.export": "匯出",
    "query.actions.import": "匯入",
    "query.actions.filter": "搜尋"
  }
}

export function getIntlMessage(intl: Object, text: string) {
  const matched = text.match(/^\$\{(.*)\}$/);
  const message = matched ? intl.formatMessage({
    id: matched[1],
    defaultMessage: text
  }) : text;
  return message;
}