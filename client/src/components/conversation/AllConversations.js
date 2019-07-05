import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllConversations } from "../../actions/messageActions";

class AllConversations extends Component {
  componentDidMount() {
    this.props.getAllConversations();
  }

  render() {
    const { messages } = this.props.messages;
    console.log(messages);
    return (
      <div className="conversations-list">
        <ul>
          {messages !== null
            ? messages.conversations.map(message =>
                message.map(item => (
                  <li key={item.conversationId}>{item.body}</li>
                ))
              )
            : null}
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
