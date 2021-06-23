import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user.action";
import "./navbar.style.css";
const NavBar = ({ user, setCurrentUser }) => {
  const handleLogout = async () => {
    let response = await axios.get("/api/users/logout").then((res) => res.data);
    if (response.success) {
      setCurrentUser(null);
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <i className="fas fa-play"></i>
        <div className="logo-text">Play</div>
      </div>
      <div className="content">
        <div className="links">
          <ul>
            <li>
              <a href="#">Video</a>
            </li>
            <li>
              <Link to="/subscription">Subscriptions</Link>
            </li>
          </ul>
        </div>
        <div className="login">
          <ul>
            <li>
              {user ? (
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <Link to="/signinsignup">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = (state) => ({
  user: state.user.currentUser,
});

const MapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(MapStateToProps, MapDispatchToProps)(NavBar);
