import React, { Component } from "react";
import PropTypes from "prop-types";
import imagesLoaded from "imagesloaded";
import { Card, Button, Icon } from "antd";
import CSSModules from "react-css-modules";
import styles from "./style/ShowImage.scss";
import "./style/ShowImage.antd.scss";

@CSSModules(styles)
export default class ShowImage extends Component {
  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this);
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    cardWidth: PropTypes.number
  };

  static defaultProps = {
    cardWidth: 300
  };

  componentDidMount() {
    var that = this;
    var imgLoad = imagesLoaded(this.imgWrapper);
    imgLoad.on("done", function() {}).on("fail", function() {
      that.showImage.src = "http://i.imgur.com/DUaZWMd.png";
    });
  }

  deleteImage() {
    this.props.onChange([""]);
  }

  render() {
    const { value, cardWidth } = this.props;
    return (
      <Card style={{ width: cardWidth }} bodyStyle={{ padding: 0 }}>
        <div styleName="custom-image" ref={node => (this.imgWrapper = node)}>
          <img
            ref={showImage => (this.showImage = showImage)}
            width="100%"
            src={value}
          />
        </div>
        <div styleName="custom-card" className="custom-card">
          <Button onClick={this.deleteImage}>
            <Icon type="close" />
          </Button>
        </div>
      </Card>
    );
  }
}
