import React, { Component } from "react";
import "./countdown.css";
import image_when_title from "../resources/images/when_title.png";
import sat from "../resources/images/sat.png";
import sati from "../resources/images/sati.png";
import sata from "../resources/images/sata.png";
import dan from "../resources/images/dan.png";
import dana from "../resources/images/dana.png";
import minuta from "../resources/images/minuta.png";
import minute from "../resources/images/minute.png";

class Countdown extends Component {
  state = {
    wedding_date: Date.parse("7 Aug 2021 19:00:00 GMT+0100"),
    remaining_days: 0,
    remaining_hours: 0,
    remaining_minutes: 0,
  };

  refreshRemainingTime() {
    let remaining_time = this.state.wedding_date - Date.parse(new Date() + " GMT+0100");
    this.setState({
      remaining_days: Math.floor(remaining_time / 1000 / 60 / 60 / 24),
      remaining_hours: Math.floor((remaining_time / 1000 / 60 / 60) % 24),
      remaining_minutes: Math.floor((remaining_time / 1000 / 60) % 60),
    });
  }

  componentDidMount() {
    this.refreshRemainingTime();
    this.refresh_countdown = setInterval(
      this.refreshRemainingTime.bind(this),
      15000
    );
  }

  render() {
    return (
      <div className="countdown">
        <div className="number_days lower">{this.state.remaining_days}</div>
        <div className="number_hours">{this.state.remaining_hours}</div>
        <div className="number_minutes">{this.state.remaining_minutes}</div>
        <div className="title_days">
          {this.state.remaining_days % 10 === 1 ? (
            <img src={dan} className="time_photo" />
          ) : (
            <img src={dana} className="time_photo" />
          )}
        </div>
        <div className="title_hours">
          {this.state.remaining_hours % 10 === 1 ? (
            <img src={sat} className="time_photo" />
          ) : (this.state.remaining_hours <= 10 ||
              this.state.remaining_hours > 20) &&
            this.state.remaining_hours % 10 > 1 &&
            this.state.remaining_hours % 10 < 5 ? (
            <img src={sata} className="time_photo" />
          ) : (
            <img src={sati} className="time_photo" />
          )}
        </div>
        <div className="title_minutes upper">
          {(this.state.remaining_minutes <= 10 ||
            this.state.remaining_minutes > 20) &&
          this.state.remaining_minutes % 10 > 1 &&
          this.state.remaining_minutes % 10 < 5 ? (
            <img src={minute} className="time_photo" />
          ) : (
            <img src={minuta} className="time_photo" />
          )}
        </div>
        <div className="title">
          <img src={image_when_title} className="countdown_title_photo" />
        </div>
      </div>
    );
  }
}

export default Countdown;
