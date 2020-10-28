import React from "react"
import { FaPencilAlt, FaEdit, FaLock, FaCalendar } from "react-icons/fa"
import AuthContext from "../../contexts/auth"
import Selector from "../Selector"

const CreatePost = React.lazy(() => import("./CreatePost"))
const CalendarEvents = React.lazy(() => import("./CalendarEvents"))
const ManagePosts = React.lazy(() => import("./ManagePosts"))
const ManageAdmins = React.lazy(() => import("./ManageAdmins"))

export default function Admin() {
  const [selectedMode, setSelectedMode] = React.useState()
  const user = React.useContext(AuthContext)

  if (!user.isAdmin) {
    return (
      <div id="admin">
        <div className="content-wrapper">
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div id="admin">
      <Selector
        icons={[ <FaPencilAlt />, <FaEdit />, <FaCalendar />, <FaLock />]}
        items={["Create Post", "Manage Posts", "Calendar Events", "Manage Admins"]}
        setState={setSelectedMode}
      />
      <React.Suspense>
        {selectedMode === "Create Post" && <CreatePost user={user} />}
        {selectedMode === "Manage Posts" && <ManagePosts />}
        {selectedMode === "Calendar Events" && <CalendarEvents />}
        {selectedMode === "Manage Admins" && <ManageAdmins user={user} />}
      </React.Suspense>
    </div>
  )
}
