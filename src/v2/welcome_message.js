import React, { Component } from "react";
import "./welcome_message.css";
// import firebase from "./firebase.js";

class WelcomeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.info.title,
      single_person: props.info.single_person,
    };
  }

  render() {
    return (
      <div className="text">
        {this.state.title},<br></br> s radošću
        {this.state.single_person ? " te " : " vas "} pozivamo da
        {this.state.single_person ? " budeš " : " budete "} dio našeg velikog
        dana!
      </div>
    );
  }
}

export default WelcomeMessage;
