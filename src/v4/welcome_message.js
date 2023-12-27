import React, { Component } from "react";
import "./welcome_message.css";
import { typewriter } from "./functions.js";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

class WelcomeMessage extends Component {
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    let invite = params.get("invite");
    
    const query = ref(db, "/" + wedding);
    onValue(query, (snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        const info = data["info"];
        const guests = data["guests"];
        
        var text_to_write = new Array(
          guests[invite].title + ",",
          guests[invite].single_person ? info["invite_message"]["single"] : info["invite_message"]["more"]
        );
        var element_id = "invite_text";
        typewriter(text_to_write, element_id);
      }
    });
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: props.info.title,
  //     single_person: props.info.single_person,
  //   };
  // }

  // componentDidMount() {
  //   var invite_text = `s radošću ${this.state.single_person ? " te " : " vas "} pozivamo da ${this.state.single_person ? " budeš " : " budete "} dio našeg velikog dana!`;
  //   var text_to_write = new Array(
  //     `${this.state.title},`,
  //     invite_text
  //   );
  // }
  

  render() {
    return (
      <div className="welcome_message_container">
        <div id="invite_text" className="text welcome_message"></div>
      </div>
    );
  }
}

export default WelcomeMessage;
