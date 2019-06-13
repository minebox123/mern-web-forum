import React, { Component } from "react";
import "./style.css";

class Login extends Component {
  render() {
    return (
      <section className="login">
        <form className="login__form" onSubmit={this.onSubmit}>
          <div className="login__form--input">
            <label>Enter your email</label>
            <input type="text" name="email" onChange={this.onChange} />
          </div>
          <div className="login__form--input">
            <label>Enter your password</label>

            <input type="text" name="password" onChange={this.onChange} />
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
