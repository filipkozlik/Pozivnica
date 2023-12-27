import React, { Component } from "react";
import "./common.css";
import "./couple_about.css";
// import couple_photo from "../resources/images/D&F_054.jpg";
import couple_photo from "../resources/images/couple_photo.jpeg";
import pin from "../resources/images/pin.png";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class CoupleAbout extends Component {
  componentWillMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    this.setState({
      ready: false
    });
    
    const query = ref(db, "/" + wedding + "/info");
    onValue(query, (snapshot) => {
      if(snapshot.exists()) {
        const info = snapshot.val();
        this.setState({
          couple_about: info["about"],
          ready: true
        });
      }
    });
  }

  render() {
    if (!this.state.ready) {
      return <div></div>;
    }
    return (
      <div className="couple_about_new">
        <div className="title">Dogodila se ljubav...</div>
        <div className="couple_about_photo">
          <img
            src={couple_photo}
            className="couple_about_photo_of_us couple_about_photo_animated couple_about_photo_bounce"
          />
        </div>
        <div className="couple_about_text_box">
          <div className="pin_container">
            <div className="pin_left"><img className="pin" src={pin}/></div>
            <div className="pin_right"><img className="pin" src={pin}/></div>
          </div>
          <div className="couple_about_text text">{this.state.couple_about}</div>
        </div>
      </div>
    );
  }
}

export default CoupleAbout;
