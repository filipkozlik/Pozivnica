import React, { Component } from "react";
import PropTypes from "prop-types";
import "./response.css";
import "./checkbox.css";

import btn_minus_on from "../resources/images/btn_minus_on.png";
import btn_plus_on from "../resources/images/btn_plus_on.png";
import btn_minus_off from "../resources/images/btn_minus_off.png";
import btn_plus_off from "../resources/images/btn_plus_off.png";

import { db } from './firebase_try.js' 
import { ref, update, onValue } from 'firebase/database';

class Response extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    input_visual: PropTypes.string,
    are_ya_coming: PropTypes.string,
  };
  static defaultProps = {
    value: "0",
    onChange: () => "",
  };

  constructor(props) {
    super(props);
    this.send_response = this.send_response.bind(this);
    this.state = {
      value: props.value || "",
      is_arriving: props.info.coming,
      place_needed: false,
      input_visual: "response_container",
      are_ya_coming: "Vidimo se!",
      minus_button_enabled: false,
      plus_button_enabled: !props.info.responded,
      invite: props.info.hash,
      single_person: props.info.single_person,
      response_enabled: !props.info.responded,
      name: props.info.name,
    };
    this.is_arriving_change = this.is_arriving_change.bind(this);
    this.set_place_needed = this.set_place_needed.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.increase_adults = this.increase_adults.bind(this);
    this.decrease_adults = this.decrease_adults.bind(this);
    this.increase_kids = this.increase_kids.bind(this);
    this.decrease_kids = this.decrease_kids.bind(this);
  }

  
  componentWillMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const wedding = params.get("wedding");
    
    const query_info = ref(db, "/" + wedding + "/info");
    onValue(query_info, (snapshot) => {
      if(snapshot.exists()) {
        const info = snapshot.val();
        this.setState({
          due_date: info["due_date"],
        });
      }
    });
    
    const invite = params.get("invite");
    const query_invite = ref(db, "/" + wedding + "/guests/" + invite);
    onValue(query_invite, (snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        this.setState({
          number_of_adults: data["responded"] ? data["number_adults_confirmed"] : data["number_adults_expected"],
          number_of_kids: data["responded"] ? data["number_kids_confirmed"] : data["number_kids_expected"],
          place_needed: data["place_needed"],
        });
      }
    });
  }

  is_arriving_change(is_arriving) {
    this.setState({ is_arriving: !this.state.is_arriving });
  }

  set_place_needed() {
    this.setState({ place_needed: !this.state.place_needed });
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title);
  }

  send_response(event) {
    this.setState({
      response_enabled: false,
    });

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let wedding = params.get("wedding");
    let invite = params.get("invite");
    const invite_access = "/" + wedding + "/guests/" + invite;

    const updates = {};
    updates[invite_access + "/responded"] = true;
    updates[invite_access + "/coming"] = this.state.is_arriving;
    updates[invite_access + "/number_adults_confirmed"] = this.state.number_of_adults;
    updates[invite_access + "/number_kids_confirmed"] = this.state.number_of_kids;
    updates[invite_access + "/place_needed"] = this.state.place_needed;

    update(ref(db), updates);
  }

  increase_adults() {
    if (!this.state.response_enabled) return;
    if (this.state.number_of_adults < 9) {
      this.setState({
        number_of_adults: this.state.number_of_adults + 1,
      });
    }
  }

  decrease_adults() {
    if (!this.state.response_enabled) return;
    if (this.state.number_of_adults > 0) {
      this.setState({
        number_of_adults: this.state.number_of_adults - 1,
      });
    }
  }

  increase_kids() {
    if (!this.state.response_enabled) return;
    if (this.state.number_of_kids < 9) {
      this.setState({
        number_of_kids: this.state.number_of_kids + 1,
      });
    }
  }

  decrease_kids() {
    if (!this.state.response_enabled) return;
    if (this.state.number_of_kids > 0) {
      this.setState({
        number_of_kids: this.state.number_of_kids - 1,
      });
    }
  }

  render() {
    const { value } = this.state;
    const { id } = this.props;

    let send_response_button_html = (
      <button
        className="response_button_style_disabled response_animated response_bounce"
        onClick={this.send_response}
      >
        Pošalji
      </button>
    );
    let warning_message_html = (
      <div className="warning_text">
        {this.state.single_person ? "Tvoj " : "Vaš "}odgovor je zabilježen. U
        slučaju promjene plana, molimo da nam
        {this.state.single_person ? " javiš " : " javite "}do {" " + this.state.due_date}
      </div>
    );
    let toggle_button_html = (
      <label class="checkbox checkbox_enabled path">
        <input type="checkbox" checked={this.state.is_arriving} onChange={this.is_arriving_change} />
        <svg viewBox="0 0 21 21">
          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
      </label>
    );
    if (!this.state.response_enabled) {
      toggle_button_html = (
        <label class="checkbox checkbox_disabled path">
          <input type="checkbox" checked={this.state.is_arriving} />
          <svg viewBox="0 0 21 21">
            <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
          </svg>
        </label>
      );
    }
    let place_toggle_button_html = (
      <label class="checkbox checkbox_enabled path">
        <input type="checkbox" checked={this.state.place_needed} onChange={this.set_place_needed} />
        <svg viewBox="0 0 21 21">
          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
      </label>
    );
    if (!this.state.response_enabled) {
      place_toggle_button_html = (
        <label class="checkbox checkbox_disabled path">
          <input type="checkbox" checked={this.state.place_needed} />
          <svg viewBox="0 0 21 21">
            <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
          </svg>
        </label>
      );
    }
    if (this.state.response_enabled) {
      send_response_button_html = (
        <button
          className="response_button_style response_animated response_bounce"
          onClick={this.send_response}
        >
          Pošalji
        </button>
      );
      warning_message_html = (
        <div className="warning_text">
          Molimo{this.state.single_person ? " te " : " vas "}da nam svoj dolazak
          {this.state.single_person ? " potvrdiš " : " potvrdite "}do
          {" " + this.state.due_date}
        </div>
      );
    }
    
    return (
      <div className={this.state.input_visual}>
        <div className="question_coming">
          <div className="text">Vidimo se?</div>
        </div>
        <div className="toggle_button">{toggle_button_html}</div>
        {this.state.is_arriving && <div className="question_number_adults">
          <div className="text">Odrasli:</div>
        </div>}
        {this.state.is_arriving && <div className="number_of_adults">{this.state.number_of_adults}</div>}
        {this.state.is_arriving && <div className="minus_button_adults btn_style">
          <img src={this.state.response_enabled && this.state.number_of_adults > 0 ? btn_minus_on : btn_minus_off} className="btn" onClick={() => { this.decrease_adults(); }} />
        </div>}
        {this.state.is_arriving && <div className="plus_button_adults btn_style">
          <img src={this.state.response_enabled && this.state.number_of_adults < 9 ? btn_plus_on : btn_plus_off} className="btn" onClick={() => { this.increase_adults(); }} />
        </div>}
        {this.state.is_arriving && <div className="question_number_kids">
          <div className="text">Djeca:</div>
        </div>}
        {this.state.is_arriving && <div className="number_of_kids">{this.state.number_of_kids}</div>}
        {this.state.is_arriving && <div className="minus_button_kids btn_style">
          <img src={this.state.response_enabled && this.state.number_of_kids > 0 ? btn_minus_on : btn_minus_off} className="btn" onClick={() => { this.decrease_kids(); }} />
        </div>}
        {this.state.is_arriving && <div className="plus_button_kids btn_style">
          <img src={this.state.response_enabled && this.state.number_of_kids < 9 ? btn_plus_on : btn_plus_off} className="btn" onClick={() => { this.increase_kids(); }} />
        </div>}
        {this.state.is_arriving && <div className="question_place">
          <div className="text">Smještaj?</div>
        </div>}
        {this.state.is_arriving && <div className="place_toggle_button">{place_toggle_button_html}</div>}
        <div className="send_button">{send_response_button_html}</div>
        <div className="warning"> {warning_message_html}</div>
      </div>
    );
  }

  onChange = (event) => {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: "" });
    return this.props.onChange(id, value);
  };
}

export default Response;
