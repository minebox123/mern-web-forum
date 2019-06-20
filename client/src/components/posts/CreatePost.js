import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import "./style.css";

class CreatePost extends Component {
  state = {
    text: "",
    theme: "",
    file: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: this.state.text,
      theme: this.state.theme,
      file: this.state.file
    };

    this.props.createPost(newPost);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  fileSelectHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
    console.log(e.target.files[0]);
  };

  render() {
    const { text, theme, errors } = this.state;
    return (
      <section className="post">
        <form
          onSubmit={this.onSubmit}
          className="post__form"
          action="/post"
          method="post"
          encType="multipart/form-data"
        >
          <div className="post__form--input">
            <label>Theme</label>
            <input
              type="text"
              name="theme"
              value={theme}
              onChange={this.onChange}
            />
            {errors && <small>{errors.theme}</small>}
          </div>
          <div className="post__form--input">
            <label>Text</label>
            <textarea
              type="text"
              name="text"
              value={text}
              onChange={this.onChange}
            />
            {errors && <small>{errors.text}</small>}
          </div>
          <div className="post__form--file">
            <label>Add Image</label>
            <input
              type="file"
              name="file"
              accept=".png, .jpg"
              onChange={this.fileSelectHandler}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </section>
    );
  }
}

CreatePost.propTypes = {
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post
});

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
