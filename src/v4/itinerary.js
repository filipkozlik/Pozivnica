import React, { Component } from "react";
import "./itinerary.css";
import arrive from "../resources/images/arrive.png";
import church from "../resources/images/church2.png";
import venue from "../resources/images/venue.png";
import party from "../resources/images/party2.png";

class Itinerary extends Component {
  show_directions() {
    const link =
      "https://www.google.hr/maps/dir/Ledeni,+Ulica+Huga+Ehrlicha,+Zagreb/%C5%BDupa+Tijela+Kristova,+Zemljakova+ul.+2,+10000,+Zagreb/Restoran+Ivi%C4%87,+Kelekova+ul.+4,+10360,+Sesvete/@45.7873217,16.0046755,13.87z/data=!4m20!4m19!1m5!1m1!1s0x4765d5df363f0bd9:0x50afd5917e4ec9d!2m2!1d15.9830253!2d45.7733539!1m5!1m1!1s0x4765d5df031eeb61:0xd896926792d0ee9!2m2!1d15.9844333!2d45.7721874!1m5!1m1!1s0x476679ce908ad6dd:0xdac886dabd24637d!2m2!1d16.1044278!2d45.8218656!3e0";
    window.open(link);
  }

  render() {
    return (
      <div className="itinerary_new">
        <div className="arrive_img"><img src={arrive} className="itinerary_imgs" /></div>
        <div className="arrive_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">Okupljanje</div>
            <div className="itinerary_txt">Kafić</div>
            <div className="itinerary_txt">15:00</div>
          </div>
        </div>
        <div className="church_img"><img src={church} className="itinerary_imgs" /></div>
        <div className="church_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">Vjenčanje</div>
            <div className="itinerary_txt">Crkva</div>
            <div className="itinerary_txt">18:00</div>
          </div>
        </div>
        <div className="venue_img"><img src={venue} className="itinerary_imgs" /></div>
        <div className="venue_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">Svečana večera</div>
            <div className="itinerary_txt">Sala</div>
            <div className="itinerary_txt">20:00</div>
          </div>
        </div>
        <div className="party_img"><img src={party} className="itinerary_imgs" /></div>
        <div className="party_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">Party</div>
            <div className="itinerary_txt">do zore!</div>
          </div>
        </div>
        <div className="directions_plan">
          <button
            className="itinerary_button_style itinerary_button_animated itinerary_button_bounce"
            onClick={this.show_directions}>Putokaz
          </button>
        </div>
      </div>
    );
  }
}

export default Itinerary;
