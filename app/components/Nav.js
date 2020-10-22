import React from "react"
import { NavLink } from "react-router-dom"
import VerticalLine from "../vectors/VerticalLine"

const activeStyle = {
  textDecoration: "underline",
  textDecorationColor: "#EF233C"
}

export default function Nav() {
  return (
    <nav>
      <div className="logotype">
        <NavLink to="/">Bedford Bluffs</NavLink>
        <VerticalLine />
      </div>

      <ul>
        <NavLink
          activeStyle={activeStyle}
          to="/swim">
          <p>Swim</p>
        </NavLink>
        <NavLink
          activeStyle={activeStyle}
          to="/tennis/">
          <p>Tennis</p>
        </NavLink>
        <NavLink
          activeStyle={activeStyle}
          to="/about/">
          <p>About</p>
        </NavLink>
        <NavLink
          activeStyle={activeStyle}
          to="/contact/">
          <p>Contact</p>
        </NavLink>
        <NavLink
          activeStyle={activeStyle}
          to="/members/">
          <p>Members</p>
        </NavLink>
        <button className="btn">
          Login
        </button>
      </ul>
    </nav>
  )
}
