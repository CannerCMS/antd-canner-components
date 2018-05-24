// @flow
import * as React from 'react';
import MapComponent from 'packages/antd-object-map';
import {fromJS} from 'immutable';
import {Divider} from 'antd';
import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper(fromJS({
  placeId: "Eiflj7DngaPmlrDljJfluILmlrDojorljYDmgJ3mupDot68yMzDlt7c",
  address: "台灣新北市新莊區思源路230巷",
  lat: 25.0489013,
  lng: 121.46126290000007
}))
class MapComponentDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;

    return (
      <React.Fragment>
        <Divider>Map</Divider>
        <MapComponent
          refId={new RefId("map")}
          value={value}
          onChange={onChange}
          />
      </React.Fragment>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <MapComponentDemo1/>
      </React.Fragment>
    )
  }
}