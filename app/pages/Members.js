import React from "react"
import AuthContext from "../contexts/auth"
import { Switch, Route, useLocation } from "react-router-dom"

const RecentPosts = React.lazy(() => import("../components/memberCenter/RecentPosts"))
const Archive = React.lazy(() => import("../components/memberCenter/Archive"))
const Calendar = React.lazy(() => import("../components/memberCenter/Calendar"))
const SignUps = React.lazy(() => import("../components/memberCenter/SignUps"))
const Account = React.lazy(() => import("../components/memberCenter/Account"))
const Admin = React.lazy(() => import("../components/memberCenter/Admin"))
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
      <div id="center-flow">
        <Sidebar />
        <React.Suspense fallback={<div style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1E2562",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "20%"
        }}></div>}>
          <Switch>
            <Route exact path="/members/recent" component={RecentPosts} />
            <Route exact path="/members/archive" component={Archive} />
            <Route exact path="/members/calendar" component={Calendar} />
            <Route exact path="/members/signups" component={SignUps} />
            <Route exact path="/members/account" component={Account} />
            <Route exact path="/members/admin" component={Admin} />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  )
}
