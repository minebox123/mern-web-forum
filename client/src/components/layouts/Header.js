import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false
  };

  onArrowClick = () => {
    if (!this.state.isOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({ isOpen: !this.state.isOpen });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.onArrowClick();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isOpen } = this.state;

    const guestSession = (
      <ul className="header__links">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/login" className="header__links--login">
            Log in
          </Link>
        </li>
        <li>
          <Link to="/register" className="header__links--register">
            Sign up
          </Link>
        </li>
      </ul>
    );

    const userSession = (
      <ul className="header__links">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/post" className="header__links--post">
            Create Post
          </Link>
        </li>
        <li
          className="logout"
          onClick={this.onArrowClick}
          ref={node => {
            this.node = node;
          }}
        >
          <div className="username">
            <span>{user.username}</span>
            <i className="fas fa-sort-down" />
            {isOpen ? (
              <ul className="dropdown-menu">
                <li>
                  <Link to="profile">My profile</Link>
                </li>
                <li>
                  <Link to="messages">Messages</Link>
                </li>
                <li>
                  <Link to="premium">Premium</Link>
                </li>
                <li onClick={this.onLogoutClick}>Logout</li>
              </ul>
            ) : null}
          </div>
        </li>
      </ul>
    );
    return (
      <header className="header">
        <div className="header__container">
          <a href="/" className="header__site-name">
            Web Forum
          </a>
          {isAuthenticated ? userSession : guestSession}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
