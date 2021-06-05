import React, { Component } from "react";
import "./header_photo.css";
// import love from "../resources/images/header_photo.png";
import love from "../resources/images/kissing_couple_1.png";

class HeaderPhoto extends Component {
  render() {
    return <img src={love} className="header_photo" />;
  }
}

export default HeaderPhoto;
