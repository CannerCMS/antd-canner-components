import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} center={props.center}>
    <Marker position={props.center} />
  </GoogleMap>
));

type Props = {
  location: any
}

export default class MapComponent extends Component<Props> {
  render() {
    return (
      <SimpleGoogleMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: `250px`, marginTop: "20px" }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
        center={this.props.location}
      />
    );
  }
}