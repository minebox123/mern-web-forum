import React, { Component } from "react";
import { connect } from "react-redux";
import { addProfileInformation } from "../../actions/profileActions";
// import { imagePreview } from "../../utils/imagePreview";
import { getCurrentProfile } from "../../actions/profileActions";
import defaultAvatar from "../../img/default_avatar.png";
import facebookSpinner from "../../img/facebookSpinner.gif";
import axios from "axios";
import "./style.css";

class Profile extends Component {
  state = {
    experience: "",
    location: "",
    bio: "",
    avatar: ""
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
      bio: this.state.bio,
      avatar: this.state.avatar
    };

    this.props.addProfileInformation(userData, this.props.history);
  };

  render() {
    const { experience, location, bio, avatar } = this.state;
    console.log(this.props.profile);
    const item = this.props.profile;
    return (
      <div className="profile">
        <form
          className="profile__form"
          onSubmit={this.onSubmit}
          action="/profile"
          method="post"
          encType="multipart/form-data"
        >
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
          <div className="profile__form--file">
            <label htmlFor="avatar">Choose a picture</label>
            <input
              type="file"
              name="avatar"
              accept=".png, .jpeg"
              onChange={this.fileSelectHandler}
              className="upload"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <section className="profile__current-info">
          {item.profile === null ? (
            <img src={defaultAvatar} alt="avatar" />
          ) : (
            <img
              src={`http://localhost:5000/${item.profile.avatar}`}
              alt="avatar"
            />
          )}
          {item.profile !== null ? (
            <p>Username: {item.profile.user.username}</p>
          ) : null}
          {item.profile !== null ? (
            <p>Location: {item.profile.location}</p>
          ) : (
            <img src={facebookSpinner} alt="spinner" />
          )}
          {item.profile !== null ? <p>Bio: {item.profile.bio}</p> : null}
        </section>
      </div>
    );
  }
}

Profile.defaultProps = {
  avatar: defaultAvatar
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProfileInformation, getCurrentProfile }
)(Profile);
