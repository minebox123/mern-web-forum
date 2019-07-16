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
    const { profile } = this.props;

    return (
      <div className="user-profile">
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
            <div className="image-wrapper">
              <img src={user.avatar} alt="avatar" className="profile-pic" />
            </div>
          ) : (
            <img src={defaultAvatar} alt="Default Avatar" />
          )}
          {user.username !== null ? (
            <p className="profile-username">{user.username}</p>
          ) : (
            <p>Username: username not found </p>
          )}
          {profile.profile !== null ? (
            <p className="info">
              Years of experience: {profile.profile.experience}
            </p>
          ) : (
            <p className="info">Experience: location not provided</p>
          )}
          {profile.profile !== null ? (
            <p className="info">Location: {profile.profile.location}</p>
          ) : (
            <p className="info">Location: location not provided</p>
          )}
          {profile.profile !== null ? (
            <p className="info">Bio: {profile.profile.bio}</p>
          ) : (
            <p className="info">Bio: bio not provided</p>
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
