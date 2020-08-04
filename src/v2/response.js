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
    this.state = {
      value: props.value || "",
      is_arriving: false,
      input_visual: "grid_container_collapsed",
      are_ya_coming: "Vidimo se?",
    };
    this.is_arriving_change = this.is_arriving_change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  is_arriving_change(is_arriving) {
    this.setState({ is_arriving: !this.state.is_arriving });
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title);
  }

  render() {
    const { value } = this.state;
    const { id } = this.props;

    if (this.state.is_arriving) {
      return (
        <div className={this.state.input_visual}>
          <div className="toggle_arriving">
            <div>{this.state.are_ya_coming}</div>
            <div>
              <Switch
                checked={this.state.is_arriving}
                offColor="rgb(217, 76, 50)"
                onColor="rgb(76, 217, 100)"
                onChange={this.is_arriving_change}
              />
            </div>
          </div>
          <div className="number_of_guests"></div>
          <div className="send_response">
            <div className="send">Pošalji</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.state.input_visual}>
          <div className="toggle_arriving">
            <div>{this.state.are_ya_coming}</div>
            <div>
              <Switch
                checked={this.state.is_arriving}
                offColor="rgb(217, 76, 50)"
                onColor="rgb(76, 217, 100)"
                onChange={this.is_arriving_change}
              />
            </div>
          </div>
          <div className="send_response">
            <div className="send">Pošalji</div>
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
