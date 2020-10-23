import React from "react"

import Header from "../components/Header"
import AuthContext from "../contexts/auth"

export default function Members() {
  const user = React.useContext(AuthContext)

  return (
    <div id="members-wrapper">
      <Header text="members" />
      <div className="content-wrapper">
        {user != null && <pre>{JSON.stringify(user, null, 2)}</pre>}
        {user == null && <h2>Please login to view this page.</h2>}
      </div>
    </div>
  )
}
