import React from "react"
import { Link } from "react-router-dom"
import VerticalLine from "../vectors/VerticalLine"

const activeStyle = {
  textDecoration: "underline",
  textDecorationColor: "#EF233C"
}

export default function Nav() {
  return (
    <nav>
      <div className="logotype">
        <h1>Bedford Bluffs</h1>
        <VerticalLine />
      </div>

      <ul>
        <Link
          activeStyle={activeStyle}
          to="./swim/">
          <p>Swim</p>
        </Link>
        <Link
          activeStyle={activeStyle}
          to="./tennis/">
          <p>Tennis</p>
        </Link>
        <Link
          activeStyle={activeStyle}
          to="./about/">
          <p>About</p>
        </Link>
        <Link
          activeStyle={activeStyle}
          to="./contact/">
          <p>Contact</p>
        </Link>
        <Link
          activeStyle={activeStyle}
          to="./members/">
          <p>Members</p>
        </Link>
        <button>
          Login
        </button>
      </ul>
    </nav>
  )
}
