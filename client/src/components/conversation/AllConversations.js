import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
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
        <div className="conversation-list__search">
          <i className="fas fa-search" />
          <input type="text" placeholder="Search for a message" />
          <i className="fas fa-times" />
        </div>
        <ul>
          {messages !== null
            ? messages.conversations.map(message =>
                message.map(item => (
                  <Link
                    key={item.conversationId}
                    to={`/conversations/${item.conversationId}`}
                  >
                    <li>
                      <div className="image-wrapper">
                        <img
                          src={`http://localhost:5000/${item.user.avatar}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="data-wrapper">
                        <div className="data-body">
                          <h3>{item.user.username}</h3>
                          <p>{item.body}</p>
                        </div>
                        <p className="message-date">
                          {" "}
                          <Moment format="DD/MM/YYYY">{item.date}</Moment>
                        </p>
                      </div>
                    </li>
                  </Link>
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
