import React, { Component } from "react";
import "./Invitation.css";

import Spacer from "./spacer.js";

import Header from "./header.js";
import WelcomeMessage from "./welcome_message.js";
import Itinerary from "./itinerary.js";
import CoupleAbout from "./couple_about.js";
import Response from "./response.js";
import Countdown from "./countdown.js";
import Contact from "./contact.js";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class App extends Component {
  componentWillMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    let invite = params.get("invite");
    this.setState({
      ready: false,
    });
    
    const query = ref(db, "/" + wedding + "/guests");
    onValue(query, (snapshot) => {
      if(snapshot.exists()) {
        const guests = snapshot.val();
          this.setState({
            info: guests[invite],
            ready: true,
          });
      }
    });
  }

  render() {
    if (this.state.ready && this.state.info) {
      return (
        <div className="site">
          <div className="header">
            <Header />
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
          {/* <div className="header">
            <Header />
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
          <div className="spacer7">
            <Spacer flip="false" />
          </div>
          <div className="spacer8">
            <Spacer flip="true" />
          </div>*/}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
