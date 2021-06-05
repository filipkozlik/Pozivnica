import React, { Component } from "react";
import "./Invitation_v2.css";

import HeaderPhoto from "./v2/header_photo";
import CoupleName from "./v2/couple_name";
import WelcomeMessage from "./v2/welcome_message";
import Countdown from "./v2/countdown";
import Response from "./v2/response";
import Spacer from "./v2/spacer_2";
import Itinerary from "./v2/itinerary";
import Contact from "./v2/contact";
import CoupleAbout from "./v2/couple_about";

import firebase from "./v2/firebase.js";

class App extends Component {
  componentWillMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let invite = params.get("invite");
    this.setState({
      ready: false,
    });
    const database = firebase.database().ref("/");
    database.on("value", (snapshot) => {
      let guests = snapshot.val();
      this.setState({
        info: guests[invite],
        ready: true,
      });
    });
  }

  render() {
    if (this.state.ready && this.state.info) {
      return (
        <div className="site">
          <div className="header_photo">
            <HeaderPhoto />
          </div>
          <div className="couple_name">
            <CoupleName />
          </div>
          <div className="welcome_message">
            <WelcomeMessage info={this.state.info} />
          </div>
          <div className="itinerary">
            <Itinerary />
          </div>
          <div className="couple_about">
            <CoupleAbout />
          </div>
          <div className="response">
            <Response info={this.state.info} />
          </div>
          <div className="countdown">
            <Countdown />
          </div>
          <div className="contact">
            <Contact />
          </div>
          <div className="spacer1">
            <Spacer flip="false" />
          </div>
          <div className="spacer2">
            <Spacer flip="true" />
          </div>
          <div className="spacer3">
            <Spacer flip="false" />
          </div>
          <div className="spacer4">
            <Spacer flip="true" />
          </div>
          <div className="spacer5">
            <Spacer flip="false" />
          </div>
          <div className="spacer6">
            <Spacer flip="true" />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
