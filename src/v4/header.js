import React, { Component } from "react";
import "./header.css";

import { zoom_in_text } from "./functions.js";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class Header extends Component {
  componentDidMount() {
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
        const wedding_title = info["contact"]["bride"]["name"] + " & " + info["contact"]["groom"]["name"];
        const wedding_date = info["date"];
        this.setState({
          wedding_title: wedding_title,
          wedding_date: wedding_date,
        });
        zoom_in_text("couple_name", wedding_title);
        zoom_in_text("wedding_date", wedding_date);
      }
    });
  }

  render() {
    return (
      <div className="header_container">
        {/* <div id="couple_name" className="header_text">{this.state.wedding_title}</div>
        <div id="wedding_date" className="header_text">{this.state.wedding_date}</div> */}
        <div id="couple_name" className="header_text"></div>
        <div id="wedding_date" className="header_text"></div>
      </div>
    );
  }
}

export default Header;
