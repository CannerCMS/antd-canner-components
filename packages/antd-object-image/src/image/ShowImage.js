// @flow
import React, { PureComponent } from "react";
import { Card, Button, Icon } from "antd";
import ImageLoader from "react-loading-image";

type Props = {
  onChange: (value: Array<string> | string) => void,
  value: string,
  cardWidth: number,
  disabled: boolean
};

export default class ShowImage extends PureComponent<Props> {

  showImage: ?HTMLImageElement;
  imgWrapper: ?HTMLDivElement;

  static defaultProps = {
    cardWidth: 300
  };

  deleteImage = () => {
    this.props.onChange("");
  }

  render() {
    const { value, cardWidth, disabled } = this.props;
    return (
      <Card style={{ width: cardWidth, backgroundColor: "#EEE" }} bodyStyle={{ padding: 0 }}>
        <ImageLoader
          src={value}
          style={{ maxHeight: "200px" }}
          image={({src}) => (
            <img
              src={src}
              style={{width: "100%"}}
              />
          )}
          error={() => (
            <img
              style={{ maxHeight: "200px" }}
              src="http://i.imgur.com/DUaZWMd.png"
            />
          )}
          loading={() => {
            return (
              <div style={{ margin: "20px" }}>
                <Icon type="loading" style={{ fontSize: 24 }} spin />
              </div>
            );
          }}
        />
        {!disabled ? (
          <div style={{ padding: "10px 16px", textAlign: "right", backgroundColor: '#FFF' }}>
            <Button onClick={this.deleteImage}>
              <Icon type="close" />
            </Button>
          </div>
        ) : null}
      </Card>
    );
  }
}
