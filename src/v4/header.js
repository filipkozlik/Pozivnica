import React, { Component } from "react";
import "./header.css";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class Header extends Component {
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
          wedding_title: info["contact"]["bride"]["name"] + " & " + info["contact"]["groom"]["name"],
          wedding_date: info["date"],
        });
      }
    });
  }

  render() {
    return (
      <div className="header_container">
        <div id="couple_name" className="typedtextcss">{this.state.wedding_title}</div>
        <div id="wedding_date" className="typedtextcss">{this.state.wedding_date}</div>
      </div>
    );
  }
}

export default Header;
