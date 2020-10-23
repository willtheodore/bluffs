import React from "react"
import useHover from "../hooks/useHover"

import { validateEmail, validatePassword, signInUser } from "../utils/authentication"

function LoginContent({ setMode, dismiss }) {
  const email = React.useRef("")
  const password = React.useRef("")
  const [error, setError] = React.useState(null)
  const [emailStyle, setEmailStyle] = React.useState({ color: "black" })
  const [passwordStyle, setPasswordStyle] = React.useState({ color: "black" })

  React.useEffect(() => {
    const eVal = email.current.value
    const pVal = password.current.value

    if (eVal.length < 1) { setEmailStyle({ color: "black" }) }
    if (pVal.length < 1) { setPasswordStyle({ color: "black" }) }

    if (validateEmail(eVal)) { setEmailStyle({ color: "green"}) }
    else { setEmailStyle({ color: "red" }) }

    if (validatePassword(pVal)) { setPasswordStyle({ color: "green"}) }
    else { setPasswordStyle({ color: "red" }) }

  }, [email.current.value, password.current.value])

  const handleSubmit = () => {
    const eVal = email.current.value
    const pVal = password.current.value

    if (validateEmail(eVal)) {
    } else { return }
    if (validatePassword(pVal)) {
    } else { return }

    signInUser(eVal, pVal)
    .then(() => dismiss())
    .catch(err => setError(err.message))
  }

  const handleCreate = () => {
    setMode("create")
  }

  return (
    <React.Fragment>
      <div className="title">
        <h3>LOGIN</h3>
      </div>
      <div className="email login-input">
        <label
          htmlFor="email">
          email
        </label>
        <input
          style={emailStyle}
          type="text"
          id="email"
          ref={email} />
      </div>
      <div className="password login-input">
        <label
          htmlFor="password">
          password
        </label>
        <input
          style={passwordStyle}
          type="password"
          id="password"
          ref={password} />
      </div>
      <div className="buttons">
        <button
          onClick={handleCreate}
          className="btn create">
          CREATE
        </button>
        <button
          onClick={handleSubmit}
          className="btn submit">
          SUBMIT
        </button>
      </div>
    </React.Fragment>
  )
}

function CreateContent() {
  return (
    <h3>Create a new account.</h3>
  )
}

export default function Login({ dismiss }) {
  const [hovering, hoverRef] = useHover()
  const [mode, setMode] = React.useState("login")

  const handleBgClick = () => {
    if (hovering === true) {
      return
    } else {
      dismiss()
    }
  }

  return (
    <div className="modal-bg" onClick={handleBgClick}>
      <div
        className="modal-window login"
        ref={hoverRef} >
        {mode === "login" && <LoginContent setMode={setMode} dismiss={dismiss}/>}
        {mode === "create" && <CreateContent setMode={setMode} />}
      </div>
    </div>
  )
}
