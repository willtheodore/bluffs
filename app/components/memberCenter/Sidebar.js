import React from "react"
import { FaChevronRight, FaNewspaper, FaBox, FaCalendarAlt, FaPenSquare, FaUserAlt, FaUserTie } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import AuthContext from "../../contexts/auth"


function SidebarItem({ title, isActive, children, to }) {
  let style = {}
  if (isActive) {
    style = {
      backgroundColor: "#FFCED4",
    }
  }
  return (
    <div className="sidebar-item" style={style}>
      {children}
      <Link to={to} >
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
  const path = useLocation().pathname

  return (
    <div id="sidebar-wrapper">
      <div className="sidebar">
        <SidebarItem
          title="Recent Posts"
          isActive={path === "/members/recent"}
          to="/members/recent" >
          <FaNewspaper/>
        </SidebarItem>

        <SidebarItem
          title="Archive"
          isActive={path === "/members/archive"}
          to="/members/archive" >
          <FaBox/>
        </SidebarItem>

        <SidebarItem
          title="Calendar"
          isActive={path === "/members/calendar"}
          to="/members/calendar" >
          <FaCalendarAlt/>
        </SidebarItem>

        <SidebarItem
          title="Sign-ups"
          isActive={path === "/members/signups"}
          to="/members/signups" >
          <FaPenSquare/>
        </SidebarItem>

        <SidebarItem
          title="Account"
          isActive={path === "/members/account"}
          to="/members/account" >
          <FaUserAlt/>
        </SidebarItem>

        {isAdmin && (
          <SidebarItem
            title="Admin"
            isActive={path === "/members/admin"}
            to="/members/admin">
            <FaUserTie/>
          </SidebarItem>
        )}
      </div>
    </div>
  )
}
