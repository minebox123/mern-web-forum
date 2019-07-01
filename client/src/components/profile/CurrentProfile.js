import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profileActions";

class CurrentProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.user_id);
  }
  render() {
    console.log(this.props.profile);
    return <div>Profile</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(CurrentProfile);
