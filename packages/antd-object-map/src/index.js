// @flow
import React, { Component } from "react";
import {Map, fromJS} from 'immutable';
import GeoSuggest from "antd-geosuggest";
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';
import MapComponent from './map';

type Props = ObjectDefaultProps

export default class MapUI extends Component<Props> {
  static defaultProps = {
    value: new Map()
  };

  onChange = (value: any) => {
    const { refId } = this.props;
    if (value.length > 0) {
      this.props.onChange(refId, "update", fromJS(value[0]));
    }
  }

  render() {
    const { value } = this.props;
    const defaultValue = value.set('key', value.get('placeId', ''))
    .set('label', value.get('address', ''));
    return (
      <div>
        {/* $FlowFixMe */}
        <GeoSuggest defaultValue={[defaultValue.toJS()]} onChange={this.onChange}/>
        {value && (
          <MapComponent
            location={{
              lat: value.get("lat") || 25.0329640121,
              lng: value.get("lng") || 121.525
            }}
          />
        )}
      </div>
    );
  }
}
