import React, { Component } from "react";
import "./header_photo.css";
import love from "../resources/images/header_photo.png";

class HeaderPhoto extends Component {
  render() {
    return <img src={love} width="100%" />;
  }
}

export default HeaderPhoto;
