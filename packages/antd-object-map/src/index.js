// @flow
import React, { Component } from "react";
import GeoSuggest from "antd-geosuggest";
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';
import MapComponent from './map';

type Props = ObjectDefaultProps

export default class MapUI extends Component<Props> {
  static defaultProps = {
    value: {}
  };

  onChange = (value: any) => {
    const { refId } = this.props;
    if (value.length > 0) {
      delete value[0].gmaps;
      this.props.onChange(refId, "update", value[0]);
    }
  }

  render() {
    const { value } = this.props;
    return (
      <div>
        <GeoSuggest defaultValue={[value]} onChange={this.onChange}/>
        {value && (
          <MapComponent
            location={{
              lat: value.lat || 25.0329640121,
              lng: value.lng || 121.525
            }}
          />
        )}
      </div>
    );
  }
}
