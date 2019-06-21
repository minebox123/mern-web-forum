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
    console.log(this.props.post);
    return (
      <section className="posts">
        <h1>Posts</h1>
        <ul>
          {posts !== null ? (
            posts.map(post => (
              <li key={post._id}>
                <h3>Theme: {post.theme}</h3>
                <p>Text: {post.text}</p>
                <p className="posts__comments ">
                  <Link to="/post/comment/:id">Comments</Link>
                  {post.comments.length}
                </p>
                <img
                  src={`http://localhost:5000/${post.file[0]}`}
                  alt="user's file"
                  width="100px"
                />
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
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
