import React, { Component } from "react";
import PropTypes from "prop-types";
import Switch from "react-ios-switch";
import "./response.css";

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
      is_arriving: false,
      input_visual: "response_container",
      are_ya_coming: "Vidimo se?",
      number_of_people: 0,
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

    this.sendFeedback(templateId, {
      message_html: "Dolazimo",
      number_of_guests: "5",
      guest_name: "bbbb",
    });
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
    this.setState({
      number_of_people: this.state.number_of_people + 1,
    });
  }

  decrease_people() {
    this.setState({
      number_of_people: this.state.number_of_people - 1,
    });
  }

  render() {
    const { value } = this.state;
    const { id } = this.props;

    if (this.state.is_arriving) {
      return (
        <div className={this.state.input_visual}>
          <div className="question_coming">{this.state.are_ya_coming}</div>
          <div className="toggle_button">
            <Switch
              checked={this.state.is_arriving}
              offColor="rgb(217, 76, 50)"
              onColor="rgb(76, 217, 100)"
              onChange={this.is_arriving_change}
            />
          </div>
          <div className="question_number">U kojem broju?</div>
          <div className="number_of_people">{this.state.number_of_people}</div>
          <div className="minus_button">
            <button
              className="button_style_round"
              onClick={this.decrease_people}
            >
              -
            </button>
          </div>
          <div className="plus_button">
            <input
              type="button"
              value="+"
              className="button_style_round"
              onClick={this.increase_people}
            />
          </div>
          <div className="send_button">
            <input
              type="button"
              value="Pošalji"
              className="button_style animated bounce"
              onClick={this.send_response}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.state.input_visual}>
          <div className="question_coming">{this.state.are_ya_coming}</div>
          <div className="toggle_button">
            <Switch
              checked={this.state.is_arriving}
              offColor="rgb(217, 76, 50)"
              onColor="rgb(76, 217, 100)"
              onChange={this.is_arriving_change}
            />
          </div>
          <div className="send_button">
            <input
              type="button"
              value="Pošalji"
              className="button_style animated bounce"
              onClick={this.send_response}
            />
          </div>
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
