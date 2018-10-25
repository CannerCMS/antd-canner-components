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
  blur: boolean
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
  static htmlKey: string = 'html';
  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value[Editor.htmlKey] !== state[Editor.htmlKey]) {
      return {
        [Editor.htmlKey]: props.value[Editor.htmlKey]
      };
    }
    return state;
  }

  constructor(props: Props) {
    super(props);
    this.state = {[Editor.htmlKey]: props.value ? props.value[Editor.htmlKey] : ''};
  }

  handleChange = (delta: string) => {
    const {refId, onChange} = this.props;
    this.setState({
      [Editor.htmlKey]: delta
    }, () => {
      onChange(refId.child(Editor.htmlKey), 'update', delta);
    });
    
  }

  render() {
    return (
      <ReactQuill
        onChange={this.handleChange}
        value={this.state[Editor.htmlKey]}
        modules={modules}
        formats={formats}
      />
    )
  }
}
