// @flow

import React, { Component } from "react";
import ReactQuill, { Quill } from "@canner/react-quill";
import { SketchPicker } from "react-color";
import { Popover } from "antd";
import objectId from 'bson-objectid';
// $FlowFixMe
import "./style/EditorQuill.lib.scss";
let sizes = [];
for (let i = 10; i <= 72; i += 2) {
  sizes.push(`${i}px`);
}
let lineHeights = [];
for (let now = 0.5; now < 6; now += 0.1) {
  lineHeights.push(String(now));
}
// $FlowFixMe
let letterSpacings = lineHeights.filter(i => i >= 1).map(i => `${i}px`);
var fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = sizes;
const Parchment = Quill.import("parchment");
const LineHeightStyle = new Parchment.Attributor.Style(
  "lineheight",
  "line-height",
  {
    scope: Parchment.Scope.BLOCK,
    whitelist: lineHeights
  }
);
const LetterSpacingStyle = new Parchment.Attributor.Style(
  "letterspacing",
  "letter-spacing",
  {
    scope: Parchment.Scope.INLINE,
    whitelist: letterSpacings
  }
);

sizes = sizes.map(i => {
  if (i === "12px")
    return (
      <option selected key={i} value={i}>
        {i}
      </option>
    );
  return (
    <option key={i} value={i}>
      {i}
    </option>
  );
});

lineHeights = lineHeights.map(i => {
  return (
    <option key={i} value={i}>
      {i}
    </option>
  );
});

letterSpacings = letterSpacings.map(i => {
  return (
    <option key={i} value={i}>
      {i}
    </option>
  );
});

Quill.register(LetterSpacingStyle, true);
Quill.register(LineHeightStyle, true);
Quill.register(fontSizeStyle, true);

type Props = defaultProps & { value: string };
type State = { color: string };

export default class Editor extends Component<Props, State> {
  containerId: string;
  reactQuill: ?ReactQuill;
  toolbar: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      color: "#333"
    };
    this.containerId = objectId().toString();
  }

  componentDidMount() {
    this.setDefaultValue(this.props);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.value !== this.props.value ||
     nextState.color !== this.state.color;
  }

  // 如果不先設預設值，value="" 會讓dangerousHtml break
  setDefaultValue = (props: Props) => {
    const { id, value, onChange } = props;
    if (onChange && (!value || value.length === 0)) {
      onChange(id, "update", "<div>&nbsp;<br></div>");
    }
  };

  onChange = (value: string) => {
    const { id, onChange } = this.props;
    if (!this.reactQuill) return;
    const textValue = this.reactQuill
      .getEditor()
      .getText()
      .trim();
    if (textValue.length === 0) {
      // if the length is 0, set empty string
      onChange(id, "update", "<div>&nbsp;<br></div>");
    } else {
      // else set origin value
      onChange(id, "update", value);
    }
  };

  changeColor = (color: any) => {
    this.setState({
      color: color.hex
    });
    if (!this.reactQuill) return;
    this.reactQuill.getEditor().format("color", color.hex);
    if (!this.toolbar) return;
    this.toolbar.querySelector(".ql-color .ql-stroke").style.stroke = color.hex;
  }

  render() {
    const { value } = this.props;
    const { color } = this.state;
    const modules = {
      toolbar: {
        container: `#toolbar-${this.containerId}`,
        handlers: {}
      }
    };
    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "lineheight",
      "letterspacing",
      "colorPicker",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "color"
    ];
    return (
      <div>
        <div id={`toolbar-${this.containerId}`} ref={tb => (this.toolbar = tb)}>
          <span className="ql-formats">
            <Popover
              placement="top"
              content={
                <SketchPicker
                  color={color}
                  onChangeComplete={this.changeColor}
                />
              }
              trigger="click"
            >
              <button className="ql-color" style={{ color }}>
                color
              </button>
            </Popover>
          </span>
          <span className="ql-formats">
            <select className="ql-size">{sizes}</select>
            <select className="ql-lineheight">{lineHeights}</select>
            <select className="ql-letterspacing">{letterSpacings}</select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <button className="ql-blockquote" />
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
          </span>
          <span className="ql-formats">
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
        </div>
        <ReactQuill
          ref={quill => (this.reactQuill = quill)}
          value={value}
          onChange={this.onChange}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </div>
    );
  }
}
