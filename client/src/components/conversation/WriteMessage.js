import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendMessage } from "../../actions/messageActions";
import "./style.css";

class WriteMessage extends Component {
  render() {
    return (
      <div className="conversation-field">
        <div className="conversation-field__header" />
        <div className="conversation-field__textarea">
          <div />
          <textarea placeholder="Write a message" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(WriteMessage);
