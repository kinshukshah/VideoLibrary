import React from "react";
import './navbar.style.css'
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
      <i class="fas fa-play"></i>
       Play 
      </div>
      <div className="links">
        <ul>
          <li>
            <a href="#">Video</a>
          </li>
          <li>
            <a href="#">Subscription</a>
          </li>
        </ul>
      </div>
      <div className="login">
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">LogOut</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
