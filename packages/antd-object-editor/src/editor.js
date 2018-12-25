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
    [{ 'header': [1, 2, 3, 4, 5, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    [{ 'font': [] }],
    ['link', 'image', {'color': []}, {'background': []}],
    ['clean']
  ],
}

const formats = [
  'header',
  'align',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'font',
  'link', 'image', 'color', 'background'
]

export default class Editor extends PureComponent<Props, State> {
  static htmlKey: string = 'html';
  static getDerivedStateFromProps(props) {
    if (props.value && props.value[Editor.htmlKey]) {
      return {
        [Editor.htmlKey]: props.value[Editor.htmlKey]
      };
    }
    return null;
  }

  constructor(props: Props) {
    super(props);
    this.state = {[Editor.htmlKey]: props.value ? props.value[Editor.htmlKey] : ''};
  }

  handleChange = (delta: string) => {
    const {refId, onChange} = this.props;
    onChange(refId.child(Editor.htmlKey), 'update', delta);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState[Editor.htmlKey] !== this.state[Editor.htmlKey];
  }

  render() {
    const {disabled, uiParams = {}} = this.props;
    if (uiParams.toolbar) {
      modules.toolbar = uiParams.toolbar;
    }

    return (
      <ReactQuill
        onChange={this.handleChange}
        value={this.state[Editor.htmlKey]}
        modules={modules}
        formats={uiParams.formats || formats}
        readOnly={disabled}
      />
    )
  }
}
