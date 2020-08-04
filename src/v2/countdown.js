import React, { Component } from "react";
import "./countdown.css";
import heart from "../resources/images/heart.png";

class Countdown extends Component {
  state = {
    wedding_date: Date.parse("28 Nov 2020 16:30:00 GMT+0200"),
    remaining_days: 0,
    remaining_hours: 0,
    remaining_minutes: 0,
  };

  refreshRemainingTime() {
    let remaining_time = this.state.wedding_date - Date.parse(new Date());
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
          {this.state.remaining_days % 10 === 1 ? "dan" : "dana"}
        </div>
        <div className="title_hours">
          {this.state.remaining_hours % 10 === 1
            ? "sat"
            : (this.state.remaining_hours <= 10 ||
                this.state.remaining_hours > 20) &&
              this.state.remaining_hours % 10 > 1 &&
              this.state.remaining_hours % 10 < 5
            ? "sata"
            : "sati"}
        </div>
        <div className="title_minutes upper">
          {(this.state.remaining_minutes <= 10 ||
            this.state.remaining_minutes > 20) &&
          this.state.remaining_minutes % 10 > 1 &&
          this.state.remaining_minutes % 10 < 5
            ? "minute"
            : "minuta"}
        </div>
        {/* <div className="heart1">
          <img src={heart} className="heart" />
        </div>
        <div className="heart2">
          <img src={heart} className="heart" />
        </div> */}
        <div className="title">A kolko još?</div>
      </div>
    );
  }
}

export default Countdown;
