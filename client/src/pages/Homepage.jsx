import React from "react";
import { connect } from "react-redux";

const HomePage = ({ user }) => {
  return <div>HomePage this is me !!</div>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(HomePage);
