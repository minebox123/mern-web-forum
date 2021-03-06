import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Conversations = ({ messages, user }) => {
  return (
    <React.Fragment>
      {messages !== null
        ? messages.conversations.map(message =>
            message.map(item => (
              <div>
                {item.recipient._id === user.id ? (
                  <li key={item._id}>
                    <Link to={`/mes/${item.user._id}`}>
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
                    </Link>
                  </li>
                ) : (
                  <li key={item.conversationId}>
                    <Link to={`/mes/${item.recipient._id}`}>
                      <div className="image-wrapper">
                        <img
                          src={`http://localhost:5000/${item.recipient.avatar}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="data-wrapper-small">
                        <div className="data-body-div">
                          <h3>{item.recipient.username}</h3>
                          <div>
                            <div className="image-wrapper-small">
                              <img
                                src={`http://localhost:5000/${
                                  item.user.avatar
                                }`}
                                alt="avatar"
                              />
                            </div>
                            <p>{item.body}</p>
                          </div>
                        </div>
                        <p className="message-date">
                          {" "}
                          <Moment format="DD/MM/YYYY">{item.date}</Moment>
                        </p>
                      </div>
                    </Link>
                  </li>
                )}
              </div>
            ))
          )
        : null}
    </React.Fragment>
  );
};

export default Conversations;
