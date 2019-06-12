import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__site-name">
          Web Forum
        </a>
        <div className="header__links">
          <a href="/post" className="header__links--post">
            Create Post
          </a>
          <a href="/profile" className="header__links--profile">
            Profile
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
