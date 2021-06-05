import React, { Component } from "react";
import "./contact.css";
import contact_title from "../resources/images/contact_title.png";

class Contact extends Component {
  render() {
    return (
      <div className="contact_container">
        <div className="contact_title">
          <img src={contact_title} className="contact_title_photo" />
        </div>
        <div className="contact_dolores_title">Dolores:</div>
        <div className="contact_filip_title">Filip:</div>
        <div className="contact_dolores_number">+385 91 1850 917</div>
        <div className="contact_filip_number">+358 95 8507 004</div>
      </div>
    );
  }
}

export default Contact;
