// @flow

import React, { PureComponent } from "react";
import ReactQuill from 'react-quill';
import { transformData } from 'canner-helpers';

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps

type State = {
  value: string
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default class Editor extends PureComponent<Props, State> {
  htmlKey: string;

  constructor(props: Props) {
    super(props);
    this.htmlKey = 'html';
  }

  handleChange = (value: string) => {
    const {refId, onChange} = this.props;

    onChange(refId, 'update', transformData({[this.htmlKey]: value}));
  }

  render() {
    const {value} = this.props;
    return (
      <ReactQuill
        modules={modules}
        formats={formats}
        defaultValue={value && value.get(this.htmlKey)}
        onChange={this.handleChange} />
    )
  }
}
