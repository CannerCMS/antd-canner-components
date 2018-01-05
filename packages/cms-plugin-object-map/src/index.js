// @flow
import React, { Component } from "react";
import {Map} from 'immutable';
import MapSuggest from "./MapSuggest";
import MapComponent from "./MapComponent";
import MapAddress from "./MapAddress";
import { Row, Col, Button, Icon } from "antd";
import "./style/map.antd.scss";
import "./style/map.lib.scss";

type Props = defaultProps & {
  value: Map<string, any>,
  uiParams: {
    type: "placedId" | "geocode"
  },
  transformData: Function
}

export default class MapUI extends Component<Props> {
  static defaultProps = {
    uiParams: {
      type: "placedId"
    },
    value: new Map()
  };

  onChange = (value: any) => {
    const { id, transformData } = this.props;
    this.props.onChange(id, "update", transformData(value));
  }

  handleNoneClick = () => {
    this.onChange({ address: false, placeId: false });
  }

  render() {
    const { value, uiParams } = this.props;
    return (
      <Row id="react-qa-plugin-map">
        <Col span={18}>
          {uiParams && uiParams.type === "address" ? (
            // $FlowFixMe
            <MapAddress
              lat={value.get("lat")}
              lng={value.get("lng")}
              onChange={this.onChange}
            />
          ) : (
            <MapSuggest
              address={value.get("address")}
              placeId={value.get("placeId")}
              onChange={this.onChange}
              uiParams={uiParams}
            />
          )}
        </Col>
        <Col span={6}>
          {uiParams && uiParams.type === "address" ? null : (
            <Button onClick={this.handleNoneClick}>
              <Icon type="cross" />
            </Button>
          )}
        </Col>
        {uiParams &&
        (uiParams.type === "geocode" || uiParams.type === "address") ? (
          <Col span={24}>
            <MapComponent
              location={{
                lat: value.get("lat") || 25.0329640121,
                lng: value.get("lng") || 121.525
              }}
            />
          </Col>
        ) : null}
      </Row>
    );
  }
}
