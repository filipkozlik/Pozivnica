import React, { Component } from "react";
import "./spacer.css";
import heart from "../resources/images/heart.png";

class Spacer extends Component {
  render() {
    return (
      <div className="spacer">
        <div className="item1">
          <img src={heart} className="heart" />
        </div>
        <div className="item2">
          <img src={heart} className="heart" />
        </div>
        <div className="item3">
          <img src={heart} className="heart" />
        </div>
        <div className="item4">
          <img src={heart} className="heart" />
        </div>
      </div>
    );
  }
}

export default Spacer;
