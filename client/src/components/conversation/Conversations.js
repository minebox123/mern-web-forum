import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Conversations = ({ messages }) => {
  return (
    <React.Fragment>
      {messages.conversations.map(message =>
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
      )}
    </React.Fragment>
  );
};

export default Conversations;
