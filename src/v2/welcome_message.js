import React, { Component } from "react";
import "./welcome_message.css";
import guests from "../resources/json/guests.json";

class WelcomeMessage extends Component {
  state = {
    hash: "",
    title: "Dragi",
    single_person: false,
  };

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let invite = params.get("invite");
    if (invite !== null) {
      try {
        let person = guests[invite];
        this.setState({
          hash: { invite },
          title: person["title"],
          single_person: person["single_person"],
        });
      } catch (Exception) {}
    }
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
