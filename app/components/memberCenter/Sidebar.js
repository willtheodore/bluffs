import React from "react"
import { FaChevronRight, FaNewspaper, FaBox, FaCalendarAlt, FaPenSquare, FaUserAlt, FaUserTie } from "react-icons/fa"
import { Link } from "react-router-dom"
import AuthContext from "../../contexts/auth"


function SidebarItem({ title, isActive, children, to }) {
  let style = {}
  if (isActive) {
    style = {
      textDecoration: "underline",
      textDecorationColor: "#EF233C",
    }
  }
  return (
    <div className="sidebar-item">
      {children}
      <Link to={to}  style={style}>
        <p>{title}</p>
      </Link>
      {!isActive && (
        <FaChevronRight />
      )}
    </div>
  )
}

export default function Sidebar() {
  const user = React.useContext(AuthContext)
  const isAdmin = true

  return (
    <div className="sidebar">
      <SidebarItem
        title="Recent Posts"
        isActive={true}
        to="/members/recent" >
        <FaNewspaper/>
      </SidebarItem>

      <SidebarItem
        title="Archive"
        isActive={false}
        to="/members/archive" >
        <FaBox/>
      </SidebarItem>

      <SidebarItem
        title="Calendar"
        isActive={false}
        to="/members/calendar" >
        <FaCalendarAlt/>
      </SidebarItem>

      <SidebarItem
        title="Sign-ups"
        isActive={false}
        to="/members/signups" >
        <FaPenSquare/>
      </SidebarItem>

      <SidebarItem
        title="Account"
        isActive={false}
        to="/members/account" >
        <FaUserAlt/>
      </SidebarItem>

      {isAdmin && (
        <SidebarItem
          title="Admin"
          isActive={false}
          to="/members/admin">
          <FaUserTie/>
        </SidebarItem>
      )}
    </div>
  )
}
