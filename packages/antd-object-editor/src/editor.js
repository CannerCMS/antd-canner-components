// @flow
import React, { PureComponent } from "react";
import ReactQuill, {Quill} from 'react-quill';
window.Quill = Quill;

const { ImageDrop }  = require('quill-image-drop-module');
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps

type State = {
}

const modules = {
  imageDrop: true,
  imageResize: {
    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
  },
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

    onChange(refId.child(this.htmlKey), 'update', value);
  }

  render() {
    const {value} = this.props;
    return (
      <ReactQuill
        modules={modules}
        formats={formats}
        value={value && value[this.htmlKey]}
        onChange={this.handleChange} />
    )
  }
}
