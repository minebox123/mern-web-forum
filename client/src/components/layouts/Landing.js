import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <section className="landing-page">
        <div className="landing-page__message">
          <h1>
            Start using our <span>web forum taday</span>
          </h1>
        </div>
        <div className="landing-page__links">
          <a href="/register" className="landing-page__links--register">
            REGISTER
          </a>
          <a href="/login" className="landing-page__links--login">
            LOGIN
          </a>
        </div>
      </section>
    );
  }
}

export default Landing;

{
  /* <section className="landing-page">
        <form className="landing-page__registration-form">
          <div className="registration-form">
            <label>Enter your username</label>
            <input type="text" />
          </div>
          <div className="registration-form">
            <label>Enter your email</label>
            <input type="text" />
          </div>
          <div className="registration-form">
            <label>Enter your password</label>
            <input type="text" />
          </div>
          <div className="registration-form">
            <label>Confirm the password</label>
            <input type="text" />
          </div>
        </form>
      </section> */
}
