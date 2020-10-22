import React from "react"
import PropTypes from "prop-types"
import HeaderBG from "../vectors/HeaderBG"

export default function Header({ text }) {
  return (
    <div className="header-comp">
      <HeaderBG />
      <div>
        <h1>{text.toUpperCase()}</h1>
      </div>
    </div>
  )
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
}
