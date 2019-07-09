import React, { Component } from "react";
import PropTypes from "prop-types";
import NoConversation from "./NoConversations";
import Conversations from "./Conversations";
import { connect } from "react-redux";

import { getAllConversations } from "../../actions/messageActions";

class AllConversations extends Component {
  state = {
    height: null
  };

  componentDidMount() {
    this.props.getAllConversations();
    window.addEventListener("resize", this.updateWindowDimension());
  }

  componentWillUnmout() {
    window.addEventListener("resize", this.updateWindowDimension());
  }

  updateWindowDimension() {
    this.setState({
      height: window.innerHeight - 175
    });
  }

  render() {
    const { messages } = this.props.messages;
    const { height } = this.state;

    return (
      <div className="conversations-list" style={{ height: height }}>
        <div className="conversation-list__search">
          <i className="fas fa-search" />
          <input type="text" placeholder="Search for a message" />
          <i className="fas fa-times" />
        </div>
        <ul>
          {messages !== null ? (
            <Conversations messages={messages} />
          ) : (
            <NoConversation />
          )}
        </ul>
      </div>
    );
  }
}

AllConversations.propTypes = {
  messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.message
});

export default connect(
  mapStateToProps,
  { getAllConversations }
)(AllConversations);
