import React, { Component } from "react";
import { connect } from "react-redux";
import { addProfileInformation } from "../../actions/profileActions";

class Profile extends Component {
  state = {
    experience: "",
    location: "",
    bio: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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
    return (
      <section className="profile">
        <form className="profile__form" onSubmit={this.onSubmit}>
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
          <div className="profile__form--input">
            <label>Write your bio</label>
            <textarea
              type="text"
              name="bio"
              value={bio}
              onChange={this.onChange}
            />
          </div>
          <input type="submit" value="Submit" className="" />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProfileInformation }
)(Profile);
