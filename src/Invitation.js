import React, { Component } from "react";
import "./Invitation.css";
import guests from "./resources/json/guests.json";
import MapContainer from "./components/map";
import Response from "./components/response";
import Field from "./components/input_field";

class App extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    wedding_date: Date.parse("28 Nov 2020 16:30:00 GMT+0200"),
    remaining_days: 0,
    remaining_hours: 0,
    remaining_minutes: 0,
    refreshed: true,
    hash: "",
    title: "Poštovani",
    single_person: false,
  };

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let invite = params.get("invite");
    if (invite !== null) {
      try {
        let person = guests[invite];
        this.setState({
          hash: { invite },
          title: person["title"],
          single_person: person["single_person"],
        });
      } catch (Exception) {}
    }
    this.refreshRemainingTime();
    this.refresh_countdown = setInterval(
      this.refreshRemainingTime.bind(this),
      15000
    );
  }

  // Setting listener when component will mount
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange("Resize"));
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  // Removing listener when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    clearInterval(this.refresh_countdown);
  }

  refreshRemainingTime() {
    let remaining_time = this.state.wedding_date - Date.parse(new Date());
    this.setState({
      remaining_days: Math.floor(remaining_time / 1000 / 60 / 60 / 24),
      remaining_hours: Math.floor((remaining_time / 1000 / 60 / 60) % 24),
      remaining_minutes: Math.floor((remaining_time / 1000 / 60) % 60),
    });
  }

  refresh_states() {
    this.setState({ width: window.innerWidth });
    this.setState({ height: window.innerHeight });
  }

  // Setting the width state
  handleWindowSizeChange = (caller = "Resize") => {
    this.refresh_states();
  };

  render() {
    if (window.performance && this.state.refreshed) {
      if (performance.navigation.type === 1) {
        this.handleWindowSizeChange("Refresh");
        this.setState({ refreshed: false });
      }
    }
    return (
      <div className="site">
        <div className="box text header">
          <h1>{this.state.title},</h1>
          <h1>
            ovim putem pozivamo {this.state.single_person ? "te" : "vas"} na
            naše vjenčanje.
          </h1>
          <h1>
            Sve informacije o nama i našem vječanju{" "}
            {this.state.single_person ? "možeš" : "možete"} pronaći u retcima
            ispod.
          </h1>
          <h1>
            Veselimo se {this.state.single_person ? "tvojem" : "vašem"} dolasku,
          </h1>
          <h1>Vaši Dolores i Filip</h1>
        </div>
        <div className="biography">
          <div className="box about_doli_container doli_about_photo">
            <div className="box center text name">Dolores</div>
            <div className="center text about ">O Dolores</div>
          </div>
          <div className="box about_filip_container filip_about_photo">
            <div className="box center text name">Filip</div>
            <div className="center text about">O Filipu</div>
          </div>
        </div>
        <div className="countdown">
          <div className="box days countdown_color">
            <div className="box center text countdown_title">
              {this.state.remaining_days % 10 === 1 ? "Dan" : "Dana"}
            </div>
            <div className="center text countdown_value">
              <h1>{this.state.remaining_days}</h1>
            </div>
          </div>
          <div className="box hours countdown_color">
            <div className="box center text countdown_title">
              {this.state.remaining_hours % 10 === 1
                ? "Sat"
                : (this.state.remaining_hours <= 10 ||
                    this.state.remaining_hours > 20) &&
                  this.state.remaining_hours % 10 > 1 &&
                  this.state.remaining_hours % 10 < 5
                ? "Sata"
                : "Sati"}
            </div>
            <div className="center text countdown_value">
              <h1>{this.state.remaining_hours}</h1>
            </div>
          </div>
          <div className="box minutes countdown_color">
            <div className="box center text countdown_title">
              {(this.state.remaining_minutes <= 10 ||
                this.state.remaining_minutes > 20) &&
              this.state.remaining_minutes % 10 > 1 &&
              this.state.remaining_minutes % 10 < 5
                ? "Minute"
                : "Minuta"}
            </div>
            <div className="center text countdown_value">
              <h1>{this.state.remaining_minutes}</h1>
            </div>
          </div>
        </div>
        {/* <div className="map">
          <MapContainer />
        </div>
        <div className="response">
          <Field />
        </div> */}
      </div>
    );
  }
}

export default App;
