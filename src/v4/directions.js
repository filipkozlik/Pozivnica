import React, { Component } from "react";
import "./directions.css";

class Directions extends Component {
  show_directions() {
    const link =
      "https://www.google.hr/maps/dir/%C5%BDupa+Tijela+Kristova,+Zemljakova+ul.+2,+10000,+Zagreb/Ivi%C4%87+Lounge+%26+Loft+dvorane+za+vjen%C4%8Danja,+Kelekova+ul.+4,+10360,+Sesvete/@45.7841452,16.0214942,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x4765d5df031eeb61:0xd896926792d0ee9!2m2!1d15.9844333!2d45.7721874!1m5!1m1!1s0x476679ce908ad6dd:0xc293bf841f00841c!2m2!1d16.1045995!2d45.8220608!3e0";
    window.open(link);
  }

  render() {
    return (
      <button
        className="animated bounce directions_button_style"
        onClick={this.show_directions}
      >
        Upute
      </button>
    );
  }
}

export default Directions;
