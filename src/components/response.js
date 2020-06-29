import React, { Component } from "react";
import Field from "./input_field";
import "./response.css";

class Response extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title);
  }

  render() {
    return (
      <div className="field grid-container">
        <div className="left-container">
          <div className="item1">Dolazak</div>
          <div className="item3">Koliko osoba</div>
        </div>
        <div className="right-container">
          <div className="item2">2</div>
          <div className="item4">4</div>
        </div>
        <div className="bottom-container">
          <div className="send">Pošalji</div>
        </div>
      </div>
    );
  }
}

export default Response;
