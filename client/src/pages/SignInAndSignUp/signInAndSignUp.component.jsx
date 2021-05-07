/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SignIn from "../../components/signIn/signin.component";
import SignUp from "../../components/signUp/signUp.component";
import "./signInAndSignUp.styles.css";

const SignInAndSignUp = () => {
  return (
    <div className="login-container">
      <div className="forms-container">
        <SignIn/>
        <SignUp/>
      </div>
    </div>
  );
};

export default SignInAndSignUp;
