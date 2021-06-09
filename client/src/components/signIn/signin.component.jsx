import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./signin.styles.css";
import axios from "axios";
import { setCurrentUser } from "../../redux/user/user.action";
const SignIn = ({ setCurrentUser, history }) => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios
      .post("/api/users/login", login)
      .then((response) => response.data);
    if (response.loginSuccess) {
      localStorage.setItem("userId", response.user._id);
      history.push("/");
      setCurrentUser(response);
    }
  };

  return (
    <div className="signin-signup">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="title">Sign In</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          ></input>
        </div>
        <input type="submit" className="btn solid" value="Login"></input>
        {/* <p className="social-text">Or Sign In with Social Platforms</p> */}
        {/* <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
            </div> */}
      </form>
    </div>
  );
};

const MapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, MapDispatchToProps)(SignIn));
