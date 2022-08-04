import React from "react";
import "./Menu.css";
import { Link, NavLink } from "react-router-dom";

function Menu() {

  return (
    <>
      <div className="Navbars">
        <ul className="NavbarWrappers">
          <li className="NavbarElement">
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/about-us">
              About Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link"to="/contact-us">
              Contact Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/sign-in">
              Sign In
            </NavLink>
          </li>
          <li className="Navbutton">
            <NavLink className="linkbtn" to="/sign-up">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;