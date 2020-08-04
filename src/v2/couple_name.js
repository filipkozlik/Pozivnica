import React, { Component } from "react";
import "./couple_name.css";
// import names from "../resources/images/couple_name_small.png";
import names from "../resources/images/DF.png";

class CoupleName extends Component {
  render() {
    return <img src={names} className="photo" />;
  }
}

export default CoupleName;
