import React, { Component } from "react";
import "./spacer_2.css";
import separator from "../resources/images/line_separator.png";
import separator_flip from "../resources/images/line_separator_flip.png";

class Spacer extends Component {
  constructor(props) {
    super(props);
    if (props.flip === "true") {
      this.state = {
        image: separator_flip,
      };
    } else {
      this.state = {
        image: separator,
      };
    }
  }
  render() {
    return (
      <img
        src={this.state.image}
        className="line_spacer_photo"
        draggable="false"
      />
    );
  }
}

export default Spacer;
