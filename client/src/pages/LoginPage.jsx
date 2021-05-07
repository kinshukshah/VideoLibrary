import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";
import axios from "axios";

const LoginPage = ({ setCurrentUser, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let dataToSubmit = { email, password };
    let response = await axios
      .post("/api/user/login", dataToSubmit)
      .then((response) => response.data);
    if (response.loginSuccess) {
      history.push("/");
      setCurrentUser(response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          ></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

const MapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, MapDispatchToProps)(LoginPage);
