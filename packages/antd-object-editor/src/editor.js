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
var defaultColors = [
	'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
	'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
	'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
	'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
	'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
	'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
	'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
	'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
	'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
	'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
	'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
	'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
];

const modules = {
  imageDrop: true,
  imageResize: {
    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
  },
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'align': ['center', 'right', 'justify']}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', {'color': defaultColors}, {'background': defaultColors}],
    ['clean']
  ],
}

const formats = [
  'header',
  'align',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
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
    const {disabled} = this.props;
    return (
      <ReactQuill
        onChange={this.handleChange}
        value={this.state[Editor.htmlKey]}
        modules={modules}
        formats={formats}
        readOnly={disabled}
      />
    )
  }
}
