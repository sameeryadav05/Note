import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="NavContainer">
      <div className="navLinks">
        <NavLink
          to={"/"}
          style={({ isActive }) => ({
            color: isActive ? "#5759C3" :null, 
          })}
        >
          Home
        </NavLink>
        <NavLink
          to={"/pastes"}
          style={({ isActive }) => ({
            color: isActive ? "#5759C3" :null, 
          })}
        >
          Notes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
