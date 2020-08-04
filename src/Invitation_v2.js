import React, { Component } from "react";
import "./Invitation_v2.css";
import HeaderPhoto from "./v2/header_photo";
import CoupleName from "./v2/couple_name";
import WelcomeMessage from "./v2/welcome_message";
import Countdown from "./v2/countdown";
import Response from "./v2/response";
import Spacer from "./v2/spacer";
import Directions from "./v2/directions";
import Form from "./v2/response_form";

class App extends Component {
  render() {
    return (
      <div className="site">
        <div className="header_photo">
          <HeaderPhoto />
        </div>
        <div className="couple_name">
          <CoupleName />
        </div>
        <div className="welcome_message">
          <WelcomeMessage />
        </div>
        <div className="countdown">
          <Countdown />
        </div>
        <div className="response">
          <Response />
        </div>
        <div className="spacer1">
          <Spacer />
        </div>
        <div className="spacer2">
          <Spacer />
        </div>
        <div className="spacer3">
          <Spacer />
        </div>
        <div className="directions">
          <Directions />
        </div>
      </div>
    );
  }
}

export default App;
