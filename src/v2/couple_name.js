import React, { Component } from "react";
import "./couple_name.css";
// import names from "../resources/images/couple_name_small.png";
import names from "../resources/images/DF.png";
import date from "../resources/images/date_black_summer.PNG";

class CoupleName extends Component {
  render() {
    return (
      <div>
        <img src={names} className="couple_name_name" />
        <img src={date} className="couple_name_date" />
      </div>
    );
  }
}

export default CoupleName;
