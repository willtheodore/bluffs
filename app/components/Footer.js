import React from "react"
import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <div id="footer">
      <ul>
        <NavLink
          to="/about" >
          About
        </NavLink>
        <NavLink
          to="/contact" >
          Contact
        </NavLink>
        <NavLink
          to="/members" >
          Members
        </NavLink>
      </ul>
      <p>©Bedford Bluffs</p>
    </div>
  )
}
