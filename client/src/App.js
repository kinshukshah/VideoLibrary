import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/navbar.component";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage/homepage.component";
import SignInAndSignUp from "./pages/SignInAndSignUp/signInAndSignUp.component";
import UploadVideoPage from "./pages/UploadVideoPage/uploadvideopage.component";
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
  componentDidMount() {
    axios
      .get("/api/users/auth")
      .then((res) => this.props.setCurrentUser(res.data));
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route
            path="/signinsignup"
            render={() =>
              this.props.user.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUp />
              )
            }
          ></Route>
          <Route exact path="/video/upload" component={UploadVideoPage}></Route>
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
