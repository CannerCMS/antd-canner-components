/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import imagesLoaded from "imagesloaded";

export default class PreviewImage extends Component {
  constructor(props) {
    super(props);
    this._checkImage = this._checkImage.bind(this);
  }

  static propTypes = {
    link: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired
  };

  componentDidMount() {
    this._checkImage();
  }

  componentDidUpdate() {
    this._checkImage();
  }

  _checkImage() {
    var that = this;
    var spinner = ReactDOM.findDOMNode(this.refs.spinner);
    var ensureButton = ReactDOM.findDOMNode(this.refs.ensureButton);
    if (this.props.link) {
      var imgLoad = imagesLoaded(ReactDOM.findDOMNode(this.refs.previewImage));
      spinner.style.display = "block";
      imgLoad
        .on("done", function() {
          ReactDOM.findDOMNode(that.refs.errorBox).innerHTML = "";
          ReactDOM.findDOMNode(that.refs.img).style.display = "block";
          ensureButton.style.display = "block";
        })
        .on("fail", function() {
          ReactDOM.findDOMNode(that.refs.errorBox).innerHTML =
            "抱歉，你貼的並非正確的圖片連結";
          ReactDOM.findDOMNode(that.refs.img).style.display = "none";
          ensureButton.style.display = "none";
        })
        .on("always", function() {
          spinner.style.display = "none";
        });
    }
  }

  render() {
    var imgTmpl;
    if (this.props.link) {
      imgTmpl = (
        <img src={this.props.link} ref="img" style={{ maxWidth: "100%" }} />
      );
    }
    return (
      <div ref="previewImage" className="col col-12">
        <div
          className="qa__spinner"
          ref="spinner"
          style={{ display: "none" }}
        />
        <div className="clearfix mb2">
          <button
            className="button btn-primary bg-green"
            onClick={this.props.setValue}
            ref="ensureButton"
            style={{ display: "none" }}
          >
            確認此圖
          </button>
        </div>
        <div>{imgTmpl}</div>
        <div className="red" ref="errorBox" />
      </div>
    );
  }
}
