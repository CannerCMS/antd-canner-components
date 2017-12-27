/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import TextInput from "packages/cms-plugin-string-input";
import Editor from "packages/cms-plugin-string-editor";
import Tabs from "packages/cms-plugin-array-tabs";

const onChange = (id, type, value) => {
  console.log(id, type, value);
};

const props = {
  uiParams: {},
  onChange,
  id: 'id',
  generateId: () => 'id2',
  createEmptyData: () => undefined,
}

ReactDOM.render(
  <div>
    <Tabs {...props} />
  </div>,
  document.getElementById("root")
);
