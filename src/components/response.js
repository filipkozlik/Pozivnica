import React, { Component } from "react";
import "./response.css";

const response_style = {
  width: "90%",
  height: "90%",
  "border-radius": "10px",
};

class Response extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title);
  }

  render() {
    return (
      <div className="field">
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button type="button" onClick={this.onSubmit} className="btn">
          Save
        </button>
      </div>
    );
  }
}

export default Response;
