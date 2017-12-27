import React, { Component } from "react";
import PropTypes from "prop-types";
import imagesLoaded from "imagesloaded";
import { Card, Button, Icon, Input } from "antd";
import FaArrows from "react-icons/lib/fa/arrows";
import CSSModules from "react-css-modules";
import styles from "./style/Item.scss";
import "./style/Item.antd.scss";

@CSSModules(styles)
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }

  static propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    changeTitle: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    cardWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disableDrag: PropTypes.bool
  };

  static defaultProps = {
    cardWidth: "100%"
  };

  componentDidMount() {
    var that = this;
    var imgLoad = imagesLoaded(this.imgWrapper);
    imgLoad.on("done", function() {}).on("fail", function() {
      that.showImage.src = "http://i.imgur.com/DUaZWMd.png";
    });
  }

  deleteImage() {
    const { id, deleteImage } = this.props;
    deleteImage(id);
  }

  changeTitle(e) {
    const { id, changeTitle } = this.props;
    changeTitle(id, e.target.value);
  }

  render() {
    const { image, title, cardWidth, disableDrag } = this.props;
    return (
      <div styleName="container">
        <Card style={{ width: cardWidth }} bodyStyle={{ padding: 0 }}>
          <div styleName="custom-image" ref={node => (this.imgWrapper = node)}>
            <img ref={showImage => (this.showImage = showImage)} src={image} />
          </div>
          <div styleName="custom-card" className="custom-card">
            <Input value={title} onChange={this.changeTitle} />
            {!disableDrag ? ( // eslint-disable-line
              <Button type="primary" className="handle">
                <FaArrows />
              </Button>
            ) : null}
            <Button onClick={this.deleteImage} className="remove-button">
              <Icon type="cross" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
