import React, { Component } from "react";
import "./itinerary.css";
import arrive from "../resources/images/arrive.png";
import church from "../resources/images/church2.png";
import venue from "../resources/images/venue.png";
import party from "../resources/images/party2.png";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class Itinerary extends Component {
  show_directions() {
    // const link =
    //   "https://www.google.hr/maps/dir/Ledeni,+Ulica+Huga+Ehrlicha,+Zagreb/%C5%BDupa+Tijela+Kristova,+Zemljakova+ul.+2,+10000,+Zagreb/Restoran+Ivi%C4%87,+Kelekova+ul.+4,+10360,+Sesvete/@45.7873217,16.0046755,13.87z/data=!4m20!4m19!1m5!1m1!1s0x4765d5df363f0bd9:0x50afd5917e4ec9d!2m2!1d15.9830253!2d45.7733539!1m5!1m1!1s0x4765d5df031eeb61:0xd896926792d0ee9!2m2!1d15.9844333!2d45.7721874!1m5!1m1!1s0x476679ce908ad6dd:0xdac886dabd24637d!2m2!1d16.1044278!2d45.8218656!3e0";
    const link =
        "https://www.google.com/maps/dir/Hocus+Pocus+Caffe,+Ulica+Pavla+%C5%A0ubi%C4%87a,+Zagreb/Crkva+Majka+Bo%C5%BEja+Lurdska,+Ul.+Frana+Vrbani%C4%87a+35,+10000,+Zagreb/Kornati+wedding+%26+events,+Plaza+Zagreb+(ex+Hypo+Centar,+Ulica+Josipa+Marohni%C4%87a,+City/@45.8021299,15.9744223,15z/data=!3m1!4b1!4m20!4m19!1m5!1m1!1s0x4765d653c66e19dd:0x1d79275ce773a8e0!2m2!1d15.9917586!2d45.8088216!1m5!1m1!1s0x4765d64d2fc9802b:0x88ef642b8bdfc716!2m2!1d15.999763!2d45.8108172!1m5!1m1!1s0x4765d7b11a89e891:0x2d28fc4466c63495!2m2!1d15.9702501!2d45.7933273!3e0";
    window.open(link);
  }

  componentWillMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    this.setState({
      ready: false,
    });
    
    const query = ref(db, "/" + wedding + "/info");
    onValue(query, (snapshot) => {
      if(snapshot.exists()) {
        const info = snapshot.val();
        this.setState({
          gathering: info["itinerary"]["gathering"],
          church: info["itinerary"]["church"],
          venue: info["itinerary"]["venue"],
          ready: true,
        });
      }
    });
  }

  render() {
    if (!this.state.ready) {
      return (null);
    }
    return (
      <div className="itinerary_new">
        <div className="arrive_img"><img src={arrive} className="itinerary_imgs" /></div>
        <div className="arrive_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">{this.state.gathering.title}</div>
            <div className="itinerary_txt">{this.state.gathering.place}</div>
            <div className="itinerary_txt">{this.state.gathering.time}</div>
          </div>
        </div>
        <div className="church_img"><img src={church} className="itinerary_imgs" /></div>
        <div className="church_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">{this.state.church.title}</div>
            <div className="itinerary_txt">{this.state.church.place}</div>
            <div className="itinerary_txt">{this.state.church.time}</div>
          </div>
        </div>
        <div className="venue_img"><img src={venue} className="itinerary_imgs" /></div>
        <div className="venue_txt">
          <div className="itinerary_txt_container">
            <div className="itinerary_txt_title">{this.state.venue.title}</div>
            <div className="itinerary_txt">{this.state.venue.place}</div>
            <div className="itinerary_txt">{this.state.venue.time}</div>
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
