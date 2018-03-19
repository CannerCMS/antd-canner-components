import React, { Component } from "react";
import Geosuggest from "react-geosuggest";

import "./style/react-geosuggest.css";
import defaultMessage from "@canner/antd-locales";
import { FormattedMessage } from 'react-intl';

type Props = {
  address: string,
  onChange: Function,
  uiParams: any
}

type State = {
  suggestWord: boolean,
  focus: boolean
}

export default class Map extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      suggestWord: false,
      focus: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ suggestWord: false });
  }

  /**
   * When the input loses focus
   */
  onBlur = () => {
    if (this.state.placeId) {
      this.setState({ suggestWord: false });
    } else {
      this.setState({ suggestWord: true });
    }
  }

  onFocus = () => {
    // eslint-disable-next-line
    if (google) {
      this.setState({ focus: true });
    }
  }

  /**
   * When the input got changed
   * @param {String} value The new value
   */
  onChange = (value) => {
    this.props.onChange({ address: value, placeId: "" });
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect = (suggest) => {
    const { uiParams } = this.props;
    const { label, gmaps } = suggest;
    if (uiParams.type === "geocode") {
      const { lat, lng } = suggest.location;
      this.props.onChange({ address: label, lat, lng });
    } else if (uiParams.type === "placedId") {
      const placeId = gmaps.place_id;
      this.props.onChange({ address: label, placeId });
    }
    this.setState({ suggestWord: false });
  }

  render() {
    const { address } = this.props;
    const { suggestWord, focus } = this.state;
    return (
      <div>
        {focus ? (
          <Geosuggest
            initialValue={address}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(25.0329640121, 121.525)} // eslint-disable-line no-undef
            radius="20"
          />
        ) : (
          <input
            className="geosuggest__input"
            onFocus={this.onFocus}
            value={address}
          />
        )}
        {suggestWord ? (
          <div style={{ color: "red", marginTop: "5px" }}>
            <FormattedMessage
              id="object.map.suggest.word"
              defaultMessage={defaultMessage.en["object.map.suggest.word"]}
            />
          </div>
        ) : null}
      </div>
    );
  }
}