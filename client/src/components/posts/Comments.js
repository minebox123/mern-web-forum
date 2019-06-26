import React, { Component } from "react";
import Moment from "react-moment";
import { likePost } from "../../actions/postActions";
import { connect } from "react-redux";

class Comments extends Component {
  onLikeClick = commentId => {
    const { post } = this.props.post; // post Id

    this.props.likePost(post._id, commentId);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { data } = this.props;
    console.log(data);

    return (
      <div className="comments">
        <h2>Comments</h2>
        <ul>
          {data.map(comment => (
            <li key={comment._id}>
              <div className="profile">
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000/${comment.avatar}`}
                    alt="avatar"
                    className="profile-pic"
                  />
                </div>
                <p>{comment.username}</p>
              </div>
              <div className="message">
                <p>{comment.comment}</p>
                <div>
                  <span>
                    Posted:{" "}
                    <Moment format="DD/MM/YYYY HH:mm">{comment.date}</Moment>
                  </span>
                  <div className="rating" />
                  <i
                    className="fas fa-thumbs-up"
                    onClick={this.onLikeClick.bind(this, comment._id)}
                  />
                  <i className="fas fa-thumbs-down" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStatToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStatToProps,
  { likePost }
)(Comments);
