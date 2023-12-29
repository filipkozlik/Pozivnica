import React, { Component } from "react";
import "./countdown.css";

import { db } from './firebase_try.js' 
import { onValue, ref } from 'firebase/database';

import moment from "moment";

class Countdown extends Component {
  read_database() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    this.setState({
      ready: false,
    });
    
    const query = ref(db, "/" + wedding + "/info");
    onValue(query, (snapshot) => {
      if(snapshot.exists()) {
        const info = snapshot.val();
        const date_split = info["date"].split('.');
        const date = date_split[2] + "-" + date_split[1] + "-" + date_split[0];
        const time = info["itinerary"]["start_time"] + ":00";
        const time_split = info["itinerary"]["start_time"].split(":");
        const wedding_date = new Date(date_split[2], date_split[1], date_split[0], time_split[0], time_split[1])
        this.setState({
          wedding_date: wedding_date,
        });
        this.refreshRemainingTime();
        this.refresh_countdown = setInterval(
          this.refreshRemainingTime.bind(this),
          15000
        );
      }
    });
  }

  state = {
    wedding_date: Date.parse(new Date()),
    remaining_days: 0,
    remaining_hours: 0,
    remaining_minutes: 0,
  };

  refreshRemainingTime() {
    const wedding_moment = moment(this.state.wedding_date);
    const current_moment = moment(new Date());
    var n_days = wedding_moment.diff(current_moment, 'days');
    var n_hours = wedding_moment.diff(current_moment, 'hours') % 24;
    var n_minutes = (wedding_moment.diff(current_moment, 'minutes') % (24 * 60)) % 60;

    this.setState({
      remaining_days: n_days,
      remaining_hours: n_hours,
      remaining_minutes: n_minutes,
    });
  }

  componentDidMount() {
    this.read_database();
  }

  render() {
    return (
      <div className="countdown">
        <div className="number_days align_center">
          <div className="text">{this.state.remaining_days}</div>
        </div>
        <div className="number_hours align_center">
          <div className="text">{this.state.remaining_hours}</div>
        </div>
        <div className="number_minutes align_center">
          <div className="text">{this.state.remaining_minutes}</div>
        </div>
        <div className="title_days align_center">
          <div className="text">{this.state.remaining_days % 10 === 1 ? "dan" : "dana"}</div>
        </div>
        <div className="title_hours align_center">
          <div className="text">
            {this.state.remaining_days % 10 === 1 ? "sat" : 
            ((this.state.remaining_hours <= 10 ||
              this.state.remaining_hours > 20) &&
            this.state.remaining_hours % 10 > 1 &&
            this.state.remaining_hours % 10 < 5 ? "sata" : "sati")}
          </div>
        </div>
        <div className="title_minutes align_center">
          <div className="text">
          {(this.state.remaining_minutes <= 10 ||
            this.state.remaining_minutes > 20) &&
          this.state.remaining_minutes % 10 > 1 &&
          this.state.remaining_minutes % 10 < 5 ? "minute" : "minuta"}
          </div>
        </div>
        <div className="countdown_title align_center">
          <div className="title">Sitno brojimo...</div>
        </div>
      </div>
    );
  }
}

export default Countdown;
