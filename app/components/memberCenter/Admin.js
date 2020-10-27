import React from "react"
import { FaPencilAlt, FaLock } from "react-icons/fa"
import AuthContext from "../../contexts/auth"
import { addNewPost } from "../../utils/blog"

import Selector from "../Selector"
import { FormInput } from "../Login"

export default function Admin() {
  const [selectedMode, setSelectedMode] = React.useState()

  return (
    <div id="admin">
      <Selector
        icons={[ <FaPencilAlt />, <FaLock /> ]}
        items={["Create Post", "Manage Admins"]}
        setState={setSelectedMode}
      />
      {selectedMode === "Create Post" && <CreatePost />}
      {selectedMode === "Manage Admins" && <ManageAdmins />}
    </div>
  )
}

function ManageAdmins() {
  return (
    <div>
      Manage Admins
    </div>
  )
}

function CreatePost() {
  const title = React.useRef(null)
  const content = React.useRef(null)
  const [result, setResult] = React.useState(null)
  const user = React.useContext(AuthContext)

  const handleSubmit = () => {
    if (user != null && title != null && content != null) {
      const uid = user.uid
      const displayName = user.displayName
      const timestamp = new Date(Date.now())

      addNewPost(uid, displayName, timestamp, title.current.value, content.current.value)
      .then(docRef => setResult("success"))
      .catch(err => setResult(err))
    }
  }

  return (
    <div className="content-wrapper create-post">
      {result === null ? (
        <React.Fragment>
          <FormInput
            labelText="Title"
            reference={title}
          />
          <div className="content-input">
            <label className="content-label" htmlFor="content">Content</label>
            <textarea
              ref={content}
              id="content">
            </textarea>
          </div>
          <div className="submit">
            <button className="btn btn-bold-red" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </React.Fragment>
      ) : (
        result === "success" ? <p>Success!</p> : <p className="error">{result}</p>
      )}
    </div>
  )
}
