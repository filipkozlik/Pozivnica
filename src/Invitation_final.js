import React, { Component } from "react";
import "./Invitation_final.css";

import Header from "./v2/header.js";
import WelcomeMessage from "./v2/welcome_message_1.js";
import Countdown from "./v2/countdown.js";
import Response from "./v2/response.js";
import Spacer from "./v2/spacer_2.js";
import Itinerary from "./v2/itinerary.js";
import Contact from "./v2/contact.js";
import CoupleAbout from "./v2/couple_about.js";

import { db } from './v2/firebase_try.js' 
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
    
    const query = ref(db, "/" + wedding);
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
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
