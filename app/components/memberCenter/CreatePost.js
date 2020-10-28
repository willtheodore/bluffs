import React from "react"
import { addNewPost } from "../../utils/blog"
import { FormInput } from "../Login"


export default function CreatePost({ user }) {
  const title = React.useRef(null)
  const content = React.useRef(null)
  const [result, setResult] = React.useState(null)

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
    <div className="content-wrapper" id="create-post">
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
