// @flow
import React, { Component } from "react";
import imagesLoaded from "imagesloaded";
import { Card, Button, Icon } from "antd";
import CSSModules from "react-css-modules";
import styles from "./style/ShowImage.scss";
import "./style/ShowImage.antd.scss";

type Props = {
  onChange: (value: Array<string>) => void,
  value: string,
  cardWidth?: number,
  disabled: boolean
}

@CSSModules(styles)
export default class ShowImage extends Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).deleteImage = this.deleteImage.bind(this);
  }

  showImage: ?HTMLImageElement
  imgWrapper: ?HTMLDivElement

  static defaultProps = {
    cardWidth: 300
  };

  componentDidMount() {
    var that = this;
    var imgLoad = imagesLoaded(this.imgWrapper);
    imgLoad.on("done", function() {}).on("fail", function() {
      if (that.showImage)
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
