import React, { Component } from "react";
import "./header_photo.css";
// import love from "../resources/images/two_hearts.png";
import love from "../resources/images/trans.png";
// import love from "../resources/images/heart_rings.png";

class HeaderPhoto extends Component {
  render() {
    return <img src={love} width="500px" />;
  }
}

export default HeaderPhoto;
