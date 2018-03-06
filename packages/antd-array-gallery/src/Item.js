// @flow
import React, { Component } from "react";
import imagesLoaded from "imagesloaded";
import { Card, Button, Icon, Input } from "antd";
import FaArrows from "react-icons/lib/fa/arrows";
import CSSModules from "react-css-modules";
import styles from "./style/Item.scss";
import "./style/Item.antd.scss";

type Props = {
  id: string,
  image: string,
  title: string,
  changeTitle: (imageId: string, value: string) => void,
  deleteImage: (id: string) => void,
  cardWidth: number | string,
  disableDrag: boolean
}

@CSSModules(styles)
export default class Item extends Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).deleteImage = this.deleteImage.bind(this);
    (this: any).changeTitle = this.changeTitle.bind(this);
  }

  imgWrapper: ?HTMLDivElement;
  showImage: ?HTMLImageElement;

  static defaultProps = {
    cardWidth: "100%"
  };

  componentDidMount() {
    var that = this;
    var imgLoad = imagesLoaded(this.imgWrapper);
    imgLoad.on("fail", function() {
      if (that.showImage) {
        that.showImage.src = "http://i.imgur.com/DUaZWMd.png";
      }
    });
  }

  deleteImage() {
    const { id, deleteImage } = this.props;
    deleteImage(id);
  }

  changeTitle(e: any) {
    const { id, changeTitle } = this.props;
    changeTitle(id, e.target.value);
  }

  render() {
    const { image, title, cardWidth, disableDrag } = this.props;
    return (
      <div style={{padding: '5px'}}>
        <Card style={{ width: cardWidth }}>
          <div styleName="custom-image" ref={node => (this.imgWrapper = node)}>
            <img ref={showImage => (this.showImage = showImage)} src={image} />
          </div>
          <div styleName="custom-card" className="custom-card">
            <Input value={title} onChange={this.changeTitle} />
            {!disableDrag ? (
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
