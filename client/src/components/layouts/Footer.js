import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentDate = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="footer">
      <div className="footer__links">
        <ul>
          <li>
            <Link to="/">Web Forum</Link>
          </li>
          <li>
            <Link to="/post/all">Posts</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        </ul>
      </div>
      <p>Web Forum, all rights reserved &copy; {currentDate()}</p>
    </footer>
  );
};

export default Footer;
