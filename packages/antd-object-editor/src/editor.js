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
  htmlKey: string;

  state = {
    blur: true
  }

  constructor(props: Props) {
    super(props);
    this.htmlKey = 'html';
  }

  handleChange = (delta: string) => {
    const {refId, onChange} = this.props;

    onChange(refId.child(this.htmlKey), 'update', delta);
  }

  onFocus = () => {
    this.setState({
      blur: false
    });
  }

  onBlur = () => {
    this.setState({
      blur: true
    });
  }

  render() {
    const {value} = this.props;
    const {blur} = this.state;
    // to makes react quill controlled, we have to remount it
    const renderQuill = () => (
      <ReactQuill
        key={Math.random().toString().substr(2, 5)}
        modules={modules}
        formats={formats}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        defaultValue={value && value[this.htmlKey]}
        onChange={this.handleChange}
      />
    )
    return (
      <React.Fragment>
        {blur ? 
          renderQuill() : (
          <ReactQuill
            modules={modules}
            formats={formats}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            defaultValue={value && value[this.htmlKey]}
            onChange={this.handleChange}
          />
        )}
      </React.Fragment>
    );
  }
}
