import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import Spinner from "../../utils/Spinner";
import "./style.css";

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { posts } = this.props.post;

    return (
      <section className="posts">
        <h1>Posts</h1>
        <ul>
          {posts !== null ? (
            posts.map(post => (
              <li key={post._id} className="posts__list-item">
                <div className="posts__list-item--user">
                  <h2>
                    <Link to={`/profile/${post.user}`}>{post.name}</Link>
                  </h2>
                </div>
                <div className="posts__list-item--post">
                  <Link to={`/post/${post._id}`}>
                    <h3>Theme: {post.theme}</h3>
                  </Link>

                  <p className="posts__comments ">
                    Comments:
                    <span>{post.comments.length}</span>
                  </p>
                </div>
              </li>
            ))
          ) : (
            <Spinner />
          )}
        </ul>
      </section>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
