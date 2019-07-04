import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadMessages, sendMessage } from "../../actions/messageActions";
import { Link } from "react-router-dom";
import "./style.css";

class WriteMessage extends Component {
  state = {
    text: "",
    file: ""
  };

  componentDidMount() {
    this.props.loadMessages("5d1c9b544fb4d307d85849cc");
  }

  onMessageSubmit = e => {
    e.preventDefault();
    const form = new FormData();
    form.append("text", this.state.text);
    form.append("file", this.state.file);

    this.props.sendMessage("5d1c9b544fb4d307d85849cc", form);

    this.setState({
      text: ""
    });
  };

  onChange = e =>
    this.setState({
      text: e.target.value
    });

  fileSelectHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  render() {
    console.log(this.props.messages);
    const { user } = this.props.auth;
    const { messages } = this.props.messages;

    const conversation = (
      <React.Fragment>
        {messages !== null ? (
          <ul>
            {messages.map(message => {
              if (message.user._id === user.id) {
                return (
                  <li key={message._id} className="sender">
                    <p>{message.body}</p>
                    {message.file ? (
                      <img
                        src={`http://localhost:5000/${message.file}`}
                        alt="attachment"
                      />
                    ) : null}
                  </li>
                );
              } else {
                return (
                  <li key={message._id} className="recipient">
                    <p>{message.body}</p>
                    {message.file ? (
                      <img
                        src={`http://localhost:5000/${message.file}`}
                        alt="attachment"
                      />
                    ) : null}
                  </li>
                );
              }
            })}
          </ul>
        ) : null}
      </React.Fragment>
    );
    return (
      <div className="conversation-field">
        <div className="conversation-field__header">
          <Link to={`/profile/${this.props.match.params.recipientId}`}>
            Back
          </Link>
          <h2>User name</h2>
          <div className="stuff">
            <i className="fas fa-ellipsis-h" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
              alt="cat"
              width="30px"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
        <div className="messages">{conversation}</div>
        <div className="conversation-field__textarea">
          <form>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              accept=".png, .jpg"
              onChange={this.fileSelectHandler}
              ref={fileInput => (this.fileInput = fileInput)}
            />
            <i
              className="far fa-folder-open"
              onClick={() => this.fileInput.click()}
            />
            <textarea
              placeholder="Write a message"
              name="userInput"
              onChange={this.onChange}
            />
            <i
              className="fas fa-arrow-circle-right"
              onClick={this.onMessageSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

WriteMessage.propTypes = {
  messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.message,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadMessages, sendMessage }
)(WriteMessage);
