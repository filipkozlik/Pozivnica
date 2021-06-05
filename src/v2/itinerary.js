import React, { Component } from "react";
import "./itinerary.css";
// import church from "../resources/images/church.jpg";
// import venue from "../resources/images/venue.png";
// import party from "../resources/images/party.png";
import itinerary from "../resources/images/itinerary.png";

class Itinerary extends Component {
  show_directions() {
    const link =
      "https://www.google.hr/maps/dir/Ledeni,+Ulica+Huga+Ehrlicha,+Zagreb/%C5%BDupa+Tijela+Kristova,+Zemljakova+ul.+2,+10000,+Zagreb/Restoran+Ivi%C4%87,+Kelekova+ul.+4,+10360,+Sesvete/@45.7873217,16.0046755,13.87z/data=!4m20!4m19!1m5!1m1!1s0x4765d5df363f0bd9:0x50afd5917e4ec9d!2m2!1d15.9830253!2d45.7733539!1m5!1m1!1s0x4765d5df031eeb61:0xd896926792d0ee9!2m2!1d15.9844333!2d45.7721874!1m5!1m1!1s0x476679ce908ad6dd:0xdac886dabd24637d!2m2!1d16.1044278!2d45.8218656!3e0";
    window.open(link);
  }

  render() {
    return (
      <div className="itinerary">
        <div className="itinerary_plan">
          <img src={itinerary} className="itinerary_photo" />
        </div>
        <div className="directions_plan">
          <button
            className="itinerary_button_style itinerary_button_animated itinerary_button_bounce"
            onClick={this.show_directions}
          >
            Putokaz
          </button>
        </div>
      </div>
    );
  }
}

export default Itinerary;
