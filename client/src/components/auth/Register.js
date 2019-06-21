import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import "./style.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    avatar: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  fileSelectHandler = e =>
    this.setState({
      avatar: e.target.files[0]
    });

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      avatar: this.state.avatar,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { username, email, password, password2, errors } = this.state;
    return (
      <section className="register">
        {errors.exists && <h2>{errors.exists}</h2>}
        <h1>Register and start using the forum right now</h1>
        <form
          className="landing-page__registration-form"
          onSubmit={this.onSubmit}
          action="/register"
          method="post"
          encType="multipart/form-data"
        >
          <div className="registration-form">
            <label>Enter your username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.onChange}
            />
            {errors && <small>{errors.username}</small>}
          </div>
          <div className="registration-form">
            <label>Enter your email</label>

            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
            />
            {errors && <small>{errors.email}</small>}
          </div>
          <div className="registration-form--file">
            <label>Add Image</label>
            <input
              type="file"
              name="file"
              accept=".png, .jpg"
              onChange={this.fileSelectHandler}
            />
          </div>
          <div className="registration-form">
            <label>Enter your password</label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors && <small>{errors.password}</small>}
          </div>
          <div className="registration-form">
            <label>Confirm the password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={this.onChange}
            />
            {errors && <small>{errors.password2}</small>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
