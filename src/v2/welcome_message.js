import React, { Component } from "react";
import "./welcome_message.css";
import guests from "../resources/json/guests.json";

class WelcomeMessage extends Component {
  state = {
    hash: "",
    title: "Poštovani",
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
        {this.state.title}, ovim putem pozivamo
        {this.state.single_person ? "te" : "vas"} na naše vjenčanje. Sve
        informacije o nama i našem vječanju{" "}
        {this.state.single_person ? "možeš" : "možete"} pronaći u retcima ispod.
        Veselimo se {this.state.single_person ? "tvojem" : "vašem"} dolasku,
        Vaši Dolores i Filip
      </div>
    );
  }
}

export default WelcomeMessage;
