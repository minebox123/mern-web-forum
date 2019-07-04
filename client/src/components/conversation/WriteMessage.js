import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendMessage } from "../../actions/messageActions";
import { Link } from "react-router-dom";
import "./style.css";

class WriteMessage extends Component {
  componentDidMount() {
    this.props.sendMessage("5d1c9b544fb4d307d85849cc");
  }

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
                  </li>
                );
              } else {
                return (
                  <li key={message._id} className="recipient">
                    <p>{message.body}</p>
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
            />
          </div>
        </div>
        <div className="messages">{conversation}</div>
        <div className="conversation-field__textarea">
          {/* <div>
            <label>Choose a file</label>
            <input type="file" />
          </div> */}
          <button className="file">File</button>
          <textarea placeholder="Write a message" />
          <button className="send">Send</button>
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
  { sendMessage }
)(WriteMessage);
