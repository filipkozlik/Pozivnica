// apiKey={"AIzaSyBE0UkRiAmqSrlp7TPazgP1tbPI9oSwnL8"}

import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
} from "google-maps-react";

const mapStyles = {
  width: "90%",
  height: "90%",
  "border-radius": "10px",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { latitude: 45.7723554, longitude: 15.9842587 },
        { latitude: 45.822677, longitude: 16.105145 },
      ],
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: 45.7975162, lng: 16.04470185 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBE0UkRiAmqSrlp7TPazgP1tbPI9oSwnL8",
})(MapContainer);
