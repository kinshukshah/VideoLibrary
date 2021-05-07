import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./signUp.styles.css";
import { setCurrentUser } from "../../redux/user/user.action";
import axios from "axios";
import { withRouter } from "react-router";


const SignUp = ({ setCurrentUser, history }) => {
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "confirmpassword" && register.password !== e.target.value) {
      setError("Password Does not match");
    } else {
      setError(null);
    }
    setRegister({ ...register, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let datatosubmit = {
      email: register.email,
      name: register.name,
      lastname: register.lastname,
      password: register.password,
    };
    console.log(datatosubmit);
    let response = await axios
      .post("/api/users/register", datatosubmit)
      .then((res) => res.data);
    console.log(response);
    if (response.success) {
      let loginresponse = await axios
        .post("/api/user/login", {
          email: register.email,
          password: register.password,
        })
        .then((res) => res.data);
      if (loginresponse.loginSuccess) {
         history.push("/");
        setCurrentUser(response.userAdded);
      }
    }
  };

  return (
    <div className="signup-signup">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="title">Sign Up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={register.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={register.lastname}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-field">
          <i className="fas fa-at"></i>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={register.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={register.password}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="text"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={register.confirmpassword}
            onChange={handleChange}
          ></input>
        </div>
        <input type="submit" className="btn solid" value="Register"></input>
        {/* <p className="social-text">Or Sign Up with Social Platforms</p> */}
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
export default withRouter(connect(null, MapDispatchToProps)(SignUp));
