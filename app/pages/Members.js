import React from "react"

import Header from "../components/Header"
import AuthContext from "../contexts/auth"

export default function Members() {
  const user = React.useContext(AuthContext)
  const [posts, setPosts] = React.useState(null)

  if (user === null) {
    return (
      <div id="members-wrapper">
        <Header text="members" />
        <div className="content-wrapper">
          <h2>Please login to view this page.</h2>
        </div>
      </div>
    )
  }

  return (
    <div id="member-center">
      <h1>Member Center</h1>
      {posts === null && (
        <div className="content-wrapper">
          <h3>There are no posts at this time.</h3>
        </div>
      )}
    </div>
  )
}
