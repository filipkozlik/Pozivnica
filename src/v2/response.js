import React, { Component } from "react";
import PropTypes from "prop-types";
import "./response.css";
import "./checkbox.css";
import cya from "../resources/images/cya.png";
import how_many from "../resources/images/how_many.png";

import firebase from "./firebase.js";

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
      input_visual: "response_container",
      are_ya_coming: "Vidimo se!",
      number_of_people: props.info.number,
      minus_button_enabled: false,
      plus_button_enabled: !props.info.responded,
      invite: props.info.hash,
      single_person: props.info.single_person,
      response_enabled: !props.info.responded,
      name: props.info.name,
    };
    this.is_arriving_change = this.is_arriving_change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.increase_people = this.increase_people.bind(this);
    this.decrease_people = this.decrease_people.bind(this);
  }

  is_arriving_change(is_arriving) {
    this.setState({ is_arriving: !this.state.is_arriving });
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title);
  }

  send_response(event) {
    const templateId = "template_BfVxOubC_clone";

    this.send_email(templateId, {
      message_html: this.state.is_arriving ? "DA" : "NE",
      number_of_guests: this.state.number_of_people,
      guest_name: this.state.name,
    });
    this.setState({
      response_enabled: false,
    });
    firebase
      .database()
      .ref(this.state.invite + "/responded")
      .set(true);
    firebase
      .database()
      .ref(this.state.invite + "/coming")
      .set(this.state.is_arriving);
    firebase
      .database()
      .ref(this.state.invite + "/number")
      .set(this.state.number_of_people);
  }

  send_email(templateId, variables) {
    window.emailjs
      .send(
        "default_service",
        templateId,
        variables,
        "user_9q3ZAcIVFaBw1YEU0xzoy"
      )
      .then((res) => {
        alert("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        alert(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  increase_people() {
    // always enable minus button when number increased
    this.setState({
      minus_button_enabled: (this.state.minus_button_enabled = true),
    });
    // disabled plus button if number is 9
    if (this.state.number_of_people === 8) {
      this.setState({
        plus_button_enabled: (this.state.plus_button_enabled = false),
      });
    }
    // allow no more then 10 people
    if (this.state.number_of_people < 9) {
      this.setState({
        number_of_people: this.state.number_of_people + 1,
      });
    }
  }

  decrease_people() {
    // always enable plus button when number decreased
    this.setState({
      plus_button_enabled: (this.state.plus_button_enabled = true),
    });
    // disabled minus button if number is 1
    if (this.state.number_of_people === 1) {
      this.setState({
        minus_button_enabled: (this.state.minus_button_enabled = false),
      });
    }
    // allow more then 0 people
    if (this.state.number_of_people > 0) {
      this.setState({
        number_of_people: this.state.number_of_people - 1,
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
        {this.state.single_person ? " javiš " : " javite "}do 25.7.2021.
      </div>
    );
    let toggle_button_html = (
      <label class="checkbox path">
        <input type="checkbox" onChange={this.is_arriving_change} />
        <svg viewBox="0 0 21 21">
          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
      </label>
    );
    if (!this.state.response_enabled) {
      toggle_button_html = (
        <label class="checkbox path">
          <input type="checkbox" checked={this.state.is_arriving} />
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
          25.7.2021.
        </div>
      );
    }

    if (this.state.is_arriving) {
      let minus_button_html = (
        <button
          className="response_button_style_round_disabled"
          selectTextOnFocus={false}
        >
          -
        </button>
      );
      let plus_button_html = (
        <button
          className="response_button_style_round_disabled"
          selectTextOnFocus={false}
        >
          +
        </button>
      );

      if (this.state.minus_button_enabled) {
        minus_button_html = (
          <button
            className="response_button_style_round"
            onClick={this.decrease_people}
            onDoubleClick={this.decrease_people}
            selectTextOnFocus={false}
          >
            -
          </button>
        );
      }
      if (this.state.plus_button_enabled) {
        plus_button_html = (
          <button
            className="response_button_style_round"
            onClick={this.increase_people}
            onDoubleClick={this.increase_people}
            selectTextOnFocus={false}
          >
            +
          </button>
        );
      }
      return (
        <div className={this.state.input_visual}>
          <div className="question_coming">
            <img src={cya} className="response_question_photo" />
          </div>
          <div className="toggle_button">{toggle_button_html}</div>
          <div className="question_number">
            <img src={how_many} className="response_question_photo" />
          </div>
          <div className="number_of_people">{this.state.number_of_people}</div>
          <div className="minus_button">{minus_button_html}</div>
          <div className="plus_button">{plus_button_html}</div>
          <div className="send_button">{send_response_button_html}</div>
          <div className="warning"> {warning_message_html}</div>
        </div>
      );
    } else {
      return (
        <div className={this.state.input_visual}>
          <div className="question_coming">
            <img src={cya} className="response_question_photo" />
          </div>
          <div className="toggle_button">
            <label class="checkbox path">
              <input type="checkbox" onChange={this.is_arriving_change} />
              <svg viewBox="0 0 21 21">
                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
              </svg>
            </label>
          </div>
          <div className="send_button">{send_response_button_html}</div>
          <div className="warning">{warning_message_html}</div>
        </div>
      );
    }
  }

  onChange = (event) => {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: "" });
    return this.props.onChange(id, value);
  };
}

export default Response;
