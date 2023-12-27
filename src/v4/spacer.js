import React, { Component } from "react";
import "./spacer.css";
import separator from "../resources/images/line.png";
import separator_flip from "../resources/images/line_flip.png";

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
      <div className="spacer_container">
        <img
          src={this.state.image}
          className="line_spacer_photo"
          draggable="false"
        />
      </div>
    );
  }
}

export default Spacer;
