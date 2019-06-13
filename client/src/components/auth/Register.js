import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";
import "./style.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // componentDidUpdate() {

  // }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { username, email, password, password2 } = this.state;
    return (
      <section className="register">
        <h1>Register and start using the forum right now</h1>
        <form
          className="landing-page__registration-form"
          onSubmit={this.onSubmit}
        >
          <div className="registration-form">
            <label>Enter your username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="registration-form">
            <label>Enter your email</label>

            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
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
          </div>
          <div className="registration-form">
            <label>Confirm the password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={this.onChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
