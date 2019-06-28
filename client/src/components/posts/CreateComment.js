import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../utils/Spinner";
import Comments from "./Comments";
import { addComment, getPostById, deletePost } from "../../actions/postActions";

class CreateComment extends Component {
  state = {
    attachments: false,
    comment: "",
    dropDownMenu: false
  };

  componentDidMount() {
    this.props.getPostById(this.props.match.params.post_id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onAttachmentsClick = () =>
    this.setState({ attachments: !this.state.attachments });

  onMenuClick = () => {
    if (!this.state.dropDownMenu) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({ dropDownMenu: !this.state.dropDownMenu });
  };

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

  onDeleteClick = postId => {
    this.props.deletePost(postId);
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.onMenuClick();
  };

  render() {
    const { post } = this.props.post;
    const { attachments, dropDownMenu } = this.state;

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
                <i className="fas fa-ellipsis-h" onClick={this.onMenuClick} />
                {dropDownMenu ? (
                  <div
                    className="drop-down-menu"
                    ref={node => {
                      this.node = node;
                    }}
                  >
                    <ul>
                      <li>Copy Link</li>
                      <li>Edit</li>
                      <li onClick={this.onDeleteClick.bind(this, post._id)}>
                        Delete Post
                      </li>
                    </ul>
                  </div>
                ) : null}
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
  { addComment, getPostById, deletePost }
)(CreateComment);
