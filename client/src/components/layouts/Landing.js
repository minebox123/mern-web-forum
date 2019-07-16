import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "../../img/computer.jpg";

class Landing extends Component {
  render() {
    return (
      <section className="landing-page">
        <div className="landing-page__message">
          <img src={image} alt="keyboard" />
          <h1>
            Start using our web forum today <span>for free</span>
          </h1>
        </div>
        <div className="landing-page__links">
          <Link to="/register">
            <button className="landing-page__links--register">REGISTER</button>
          </Link>
          <Link to="/login">
            <button className="landing-page__links--login">LOGIN</button>
          </Link>
        </div>
      </section>
    );
  }
}

export default Landing;
