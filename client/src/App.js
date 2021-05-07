import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage/homepage.component";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SignInAndSignUp from "./pages/SignInAndSignUp/signInAndSignUp.component";
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
  componentDidMount() {
    axios
      .get("/api/user/auth")
      .then((res) => this.props.setCurrentUser(res.data));
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          {/* <Route
            path="/login"
            render={() =>
              this.props.user.currentUser ? <Redirect to="/" /> : <LoginPage />
            }
          ></Route>
          <Route path="/register" component={RegisterPage}></Route> */}
          <Route path="/signinsignup" render={() =>
              this.props.user.currentUser ? <Redirect to="/" /> : <SignInAndSignUp/>
            }></Route>
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  user: state.user,
});

const MapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(MapStateToProps, MapDispatchToProps)(App);
