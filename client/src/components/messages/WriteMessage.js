import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadMessages, sendMessage } from "../../actions/messageActions";
import { getProfileById } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import "../conversation/style.css";

class WriteMessage extends Component {
  state = {
    text: "",
    file: "",
    height: null,
    endpoint: `http://localhost:5000/mes/${this.props.match.params.recipientId}`
  };

  socket = io(`http://localhost:5000`);

  componentDidMount() {
    // this.props.loadMessages(this.props.match.params.recipientId);
    this.socket.on("message", message => {
      console.log(message);
    });

    // Get profile information
    this.props.getProfileById(this.props.match.params.recipientId);
    window.addEventListener("resize", this.updateWindowDimension());
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateWindowDimension());
  }

  updateWindowDimension() {
    this.setState({
      height: window.innerHeight - 175
    });
  }

  onMessageSubmit = e => {
    e.preventDefault();

    // const { messages } = this.props.messages;
    const form = new FormData();
    form.append("text", this.state.text);
    form.append("file", this.state.file);

    this.socket.emit("message", this.state.text);
    // this.props.sendMessage(this.props.match.params.recipientId, form);

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
    const { user } = this.props.auth;
    const { messages } = this.props.messages;
    const { profile } = this.props.profile;
    const { height } = this.state;
    // console.log(messages);
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
          {profile !== null ? (
            <h2>{profile.user.username}</h2>
          ) : (
            <h2>User Name</h2>
          )}
          <div className="stuff">
            <i className="fas fa-ellipsis-h" />
            {profile !== null ? (
              <img
                src={`http://localhost:5000/${profile.user.avatar}`}
                alt="avatar"
                width="30px"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                alt="cat"
                width="30px"
                style={{ borderRadius: "50%" }}
              />
            )}
          </div>
        </div>
        <div className="messages" style={{ minHeight: height }}>
          {conversation}
        </div>
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
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { loadMessages, sendMessage, getProfileById }
)(WriteMessage);
