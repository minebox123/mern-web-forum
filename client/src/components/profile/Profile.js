import React, { Component } from "react";
import { connect } from "react-redux";
import { addProfileInformation } from "../../actions/profileActions";
// import { imagePreview } from "../../utils/imagePreview";
import { getCurrentProfile } from "../../actions/profileActions";
import defaultAvatar from "../../img/default_avatar.png";
// import facebookSpinner from "../../img/facebookSpinner.gif";

import "./style.css";

class Profile extends Component {
  state = {
    experience: "",
    location: "",
    bio: ""
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  fileSelectHandler = e =>
    this.setState({
      avatar: e.target.files[0]
    });

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      experience: this.state.experience,
      location: this.state.location,
      bio: this.state.bio
    };

    this.props.addProfileInformation(userData, this.props.history);
  };

  render() {
    const { experience, location, bio } = this.state;
    const { user } = this.props.auth;
    const item = this.props.profile;
    return (
      <div className="profile">
        <form className="profile__form" onSubmit={this.onSubmit}>
          <h1>Settings information</h1>
          <div className="profile__form--input">
            <label>Write your experience</label>
            <input
              type="number"
              name="experience"
              value={experience}
              onChange={this.onChange}
            />
          </div>

          <div className="profile__form--input">
            <label>Write your location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.onChange}
            />
          </div>
          <div className="profile__form--textarea">
            <label>Write your bio</label>
            <textarea
              type="text"
              name="bio"
              value={bio}
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <section className="profile__current-info">
          {user.avatar !== undefined ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <img src={defaultAvatar} alt="Default Avatar" />
          )}
          {user.username !== null ? (
            <p>Username: {user.username}</p>
          ) : (
            <p>Username: username not found </p>
          )}
          {item.profile !== null ? (
            <p>Location: {item.profile.location}</p>
          ) : (
            <p>Location: location not provided</p>
          )}
          {item.profile !== null ? (
            <p>Bio: {item.profile.bio}</p>
          ) : (
            <p>Bio: bio not provided</p>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addProfileInformation, getCurrentProfile }
)(Profile);
