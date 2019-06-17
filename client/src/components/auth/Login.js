import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "./style.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });
  render() {
    const { email, password } = this.state;
    return (
      <section className="login">
        <h1>Please Log in</h1>
        <form className="login__form" onSubmit={this.onSubmit}>
          <div className="login__form--input">
            <label>Enter your email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <div className="login__form--input">
            <label>Enter your password</label>

            <input
              type="password"
              name="password"
              value={password}
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
