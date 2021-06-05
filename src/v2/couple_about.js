import React, { Component } from "react";
import "./couple_about.css";
import couple_about_title_photo from "../resources/images/couple_about_title.png";
import couple_photo from "../resources/images/D&F_054.jpg";
import couple_about_text from "../resources/images/couple_about_text.png";

class CoupleAbout extends Component {
  render() {
    return (
      <div className="couple_about">
        <div className="couple_about_title">
          <img
            src={couple_about_title_photo}
            className="couple_about_title_photo"
          />
        </div>
        <div className="couple_about_photo">
          <img
            src={couple_photo}
            className="couple_about_photo_of_us couple_about_photo_animated couple_about_photo_bounce"
          />
        </div>
        <div className="couple_about_text">
          <img src={couple_about_text} className="couple_about_text_photo" />
        </div>
      </div>
    );
  }
}

export default CoupleAbout;
