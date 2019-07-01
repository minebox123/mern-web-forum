import React, { Component } from "react";
import Moment from "react-moment";
import { likePost, dislikePost } from "../../actions/postActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Comments extends Component {
  onLikeClick = commentId => {
    const { post } = this.props.post; // post Id

    this.props.likePost(post._id, commentId);

    window.location.reload();
  };

  onDislikeClick = commentId => {
    const { post } = this.props.post;
    this.props.dislikePost(post._id, commentId);
    window.location.reload();
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  findUserDislike = dislikes => {
    const { auth } = this.props;
    if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
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
                <div>
                  <p>{comment.comment}</p>
                  {comment.file.map(image => (
                    <img
                      src={`http://localhost:5000/${image}`}
                      alt="attachment"
                      key={comment._id}
                      className="attachment"
                    />
                  ))}
                </div>
                <div>
                  <span>
                    Posted:{" "}
                    <Moment format="DD/MM/YYYY HH:mm">{comment.date}</Moment>
                  </span>
                  <div className="rating">
                    <div
                      type="button"
                      onClick={this.onLikeClick.bind(this, comment._id)}
                    >
                      <i
                        className={classnames("fas fa-thumbs-up", {
                          "text-info": this.findUserLike(comment.likes)
                        })}
                      />

                      {comment.likes.length}
                    </div>
                    <div
                      type="button"
                      onClick={this.onDislikeClick.bind(this, comment._id)}
                    >
                      <i
                        className={classnames("fas fa-thumbs-down", {
                          "text-info": this.findUserDislike(comment.dislikes)
                        })}
                      />
                      {comment.dislikes.length}
                    </div>
                  </div>
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
  { likePost, dislikePost }
)(Comments);
