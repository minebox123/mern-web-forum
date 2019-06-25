import React from "react";
import { Link } from "react-router-dom";

const Attachments = ({ post, attachments }) => {
  return (
    <div className="posts__list-item--post">
      <h3>Theme: {post.theme}</h3>
      <p>Text: {post.text}</p>
      {post.file.length === 0 ? null : (
        <React.Fragment>
          <p className="attachments">
            Attachments{" "}
            <i
              className="fas fa-angle-down"
              onClick={this.onAttachmentsClick}
            />
          </p>
          {!attachments ? null : (
            <img
              src={`http://localhost:5000/${post.file[0]}`}
              alt="user's file"
              className="attachments-files"
            />
          )}
        </React.Fragment>
      )}

      <p className="posts__comments ">
        <Link to="/post/comment/:id">Comments</Link>
        {post.comments.length}
      </p>
    </div>
  );
};

export default Attachments;
