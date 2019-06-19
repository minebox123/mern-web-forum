import React, { Component } from "react";
import { connect } from "react-redux";
import { addProfileInformation } from "../../actions/profileActions";
// import { imagePreview } from "../../utils/imagePreview";
import { getCurrentProfile } from "../../actions/profileActions";
import defaultAvatar from "../../img/default_avatar.png";
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

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
      // avatar: URL.createObjectURL(e.target.files[0])
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
    console.log(this.props);
    const { experience, location, bio, avatar } = this.state;
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
          <div className="profile__form--file">
            <label htmlFor="avatar">Choose a picture</label>
            <input
              type="file"
              name="avatar"
              accept=".png, .jpeg"
              onChange={this.onChange}
              className="upload"
            />
            {avatar ? <img src={avatar} alt="icon" /> : null}
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <section className="profile__current-info">
          <img src={defaultAvatar} alt="avatar" />
          <p>username: {}</p>
          <p>Location: {this.props.profile.location}</p>
          <p>Experience: {this.props.profile.experience}</p>
          <p>Bio: {this.props.profile.bio}</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProfileInformation, getCurrentProfile }
)(Profile);
