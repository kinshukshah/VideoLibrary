import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";

const RegisterPage = ({ setCurrentUser, history }) => {
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
    let response = await axios
      .post("/api/users/register", datatosubmit)
      .then((res) => res.data);
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={register.name}
          onChange={handleChange}
        ></input>
      </label>
      <br />
      <label>
        LastName:
        <input
          type="text"
          name="lastname"
          value={register.lastname}
          onChange={handleChange}
        ></input>
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={register.email}
          onChange={handleChange}
        ></input>
      </label>
      <br />
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={register.password}
          onChange={handleChange}
        ></input>
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="text"
          name="confirmpassword"
          value={register.confirmpassword}
          onChange={handleChange}
        ></input>
        {error ? <span>{error}</span> : null}
      </label>
      <br />
      <input type="submit" value="Submit"></input>
    </form>
  );
};

const MapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, MapDispatchToProps)(RegisterPage);
