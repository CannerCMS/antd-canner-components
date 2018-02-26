import React from "react";
import ReactDOM from "react-dom";
import immutable from 'immutable';
import Breadcrumb from "packages/cms-plugin-array-breadcrumb";

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
    <Breadcrumb
      id="gallery"
      value={immutable.fromJS([{
        image: "./test.png",
        title: "image1"
      }, {
        image: "./test2.png",
        title: "image2"
      }])}/>
  </div>,
  document.getElementById("root")
);
