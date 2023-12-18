import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <input
        type="button"
        value="Submit"
        className="btn btn--submit"
        onClick={this.handleSubmit}
      />
    );
  }

  handleSubmit(event) {
    const templateId = "template_BfVxOubC_clone";

    this.sendFeedback(templateId, {
      message_html: "Dolazimo",
      number_of_guests: "5",
      guest_name: "bbbb",
    });
  }

  sendFeedback(templateId, variables) {
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
}
