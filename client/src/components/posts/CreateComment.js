import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../utils/Spinner";
import Comments from "./Comments";
import { addComment, getPostById } from "../../actions/postActions";

class CreateComment extends Component {
  state = {
    attachments: false,
    comment: ""
  };

  componentDidMount() {
    this.props.getPostById(this.props.match.params.post_id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onAttachmentsClick = e =>
    this.setState({
      attachments: !this.state.attachments
    });

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newComment = {
      comment: this.state.comment,
      username: user.username,
      avatar: user.avatar
    };
    this.setState({
      comment: ""
    });

    this.props.addComment(this.props.match.params.post_id, newComment);
  };

  render() {
    const { post } = this.props.post;
    const { attachments } = this.state;

    return (
      <React.Fragment>
        {post !== null ? (
          <React.Fragment>
            <div className="post">
              <div className="post-user">
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000/${post.avatar}`}
                    alt="avatar"
                    className="profile-pic"
                  />
                </div>
                <h2 onClick={this.profileHandler} id={post.user}>
                  {post.name}
                </h2>
              </div>
              <div className="post-text">
                <h3>{post.theme}</h3>
                <p>{post.text}</p>
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
              </div>
            </div>
            <Comments data={post.comments} />

            <div className="editor">
              <form onSubmit={this.onSubmit}>
                <div>
                  <label>Add Comment</label>
                  <textarea
                    type="text"
                    name="comment"
                    onChange={this.onChange}
                    value={this.state.comment}
                    placeholder="Type something"
                  />
                </div>
                <button type="submit" className="button">
                  Submit
                </button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addComment, getPostById }
)(CreateComment);
