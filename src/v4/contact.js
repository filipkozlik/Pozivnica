import React, { Component } from "react";
import "./common.css";
import "./contact.css";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class Contact extends Component {
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
          bride_name: info["contact"]["bride"]["name"],
          bride_number: info["contact"]["bride"]["number"],
          groom_name: info["contact"]["groom"]["name"],
          groom_number: info["contact"]["groom"]["number"],
          ready: true,
        });
      }
    });
  }

  render() {
    return (
      <div>
      <div className="title">Kontakt</div>
      <div className="contact_container">
        <div className="contact_bride_title text">{this.state.bride_name}:</div>
        <div className="contact_groom_title text">{this.state.groom_name}:</div>
        <div className="contact_bride_number text">{this.state.bride_number}</div>
        <div className="contact_groom_number text">{this.state.groom_number}</div>
      </div>
      </div>
    );
  }
}

export default Contact;
