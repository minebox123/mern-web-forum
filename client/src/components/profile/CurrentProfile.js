import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profileActions";

class CurrentProfile extends Component {
  state = {
    text: "",
    file: ""
  };

  componentDidMount() {
    this.props.getProfileById(this.props.match.params.user_id);
  }

  onMessageHandle = e => this.setState({ text: e.target.value });

  fileLoad = e => this.setState({ file: e.target.files[0] });

  onMessageSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const form = new FormData();
    form.append("username", user.username);
    form.append("avatar", user.avatar);
    form.append("userId", user.id);
    form.append("text", this.state.text);
    form.append("file", this.state.file);
  };
  render() {
    const { profile } = this.props.profile;

    return (
      <div className="current-profile">
        <div className="current-profile__user-info">
          {profile !== null ? (
            <React.Fragment>
              <div>
                <img
                  src={`http://localhost:5000/${profile.user.avatar}`}
                  alt="avatar"
                />
                <h2>{profile.user.username}</h2>
                <Link to={`/conversations/createConv/${profile.user._id}`}>
                  Write a Message
                </Link>
              </div>
              <ul>
                <li>
                  <h3>
                    Date of Registration:{" "}
                    <Moment format="DD/MM/YYYY">{profile.user.date}</Moment>
                  </h3>
                </li>
                <li>
                  {profile.location ? (
                    <p>Location: {profile.location}</p>
                  ) : (
                    <p>Location is not provided</p>
                  )}
                </li>
                <li>
                  {profile.experience ? (
                    <p>Experience: {profile.location}</p>
                  ) : (
                    <p>Experience is not provided</p>
                  )}
                </li>
                <li>
                  {profile.bio ? (
                    <p>Bio: {profile.bio}</p>
                  ) : (
                    <p>Bio is not provided</p>
                  )}
                </li>
              </ul>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

CurrentProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(CurrentProfile);
