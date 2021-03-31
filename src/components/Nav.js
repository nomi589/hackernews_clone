import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="navlink-active">
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="navlink-active">
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
