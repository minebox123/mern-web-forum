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
    file: null,
    image: null,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const form = new FormData();
    form.append("file", this.state.file);
    form.append("theme", this.state.theme);
    form.append("text", this.state.text);
    form.append("name", user.username);
    form.append("avatar", user.avatar);

    this.props.createPost(form);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  fileSelectHandler = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    this.setState({
      file: e.target.files[0]
    });
  };

  render() {
    const { text, theme, errors } = this.state;

    return (
      <section className="post">
        <form onSubmit={this.onSubmit} className="post__form">
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
            {this.state.image ? (
              <img
                src={this.state.image}
                alt="preview"
                style={{ width: 200, marginTop: 20 }}
              />
            ) : null}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
