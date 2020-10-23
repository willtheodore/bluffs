import React from "react"
import AuthContext from "../contexts/auth"
import { Switch, Route, useLocation } from "react-router-dom"

import RecentPosts from "../components/memberCenter/RecentPosts"
import Archive from "../components/memberCenter/Archive"
import Calendar from "../components/memberCenter/Calendar"
import SignUps from "../components/memberCenter/SignUps"
import Account from "../components/memberCenter/Account"
import Admin from "../components/memberCenter/Admin"
import Sidebar from "../components/memberCenter/Sidebar"
import Header from "../components/Header"

export default function Members() {
  const user = React.useContext(AuthContext)
  const [posts, setPosts] = React.useState(null)
  const location = useLocation()

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
      <div>
        <Sidebar />
        <Switch>
          <Route exact path="/members/recent" component={RecentPosts} />
          <Route exact path="/members/archive" component={Archive} />
          <Route exact path="/members/calendar" component={Calendar} />
          <Route exact path="/members/signups" component={SignUps} />
          <Route exact path="/members/account" component={Account} />
          <Route exact path="/members/admin" component={Admin} />
        </Switch>
      </div>
    </div>
  )
}
