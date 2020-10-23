import React from "react"
import useHover from "../hooks/useHover"

import { validateEmail, validatePassword, signInUser, createAccount, confirmMatch, confirmNotEmpty, addName } from "../utils/authentication"

function FormInput({ reference, style = null, labelText, type = "text" }) {
  return (
    <div className="form-input">
      <label
        htmlFor={labelText}>
        {labelText}
      </label>
      <input
        style={style}
        type={type}
        id={labelText}
        ref={reference} />
    </div>
  )
}

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

    validateEmail(eVal)
    .then(res => setEmailStyle({ color: "green" }))
    .catch(err => {
      setEmailStyle({ color: "red" })
    })
    validatePassword(pVal)
    .then(res => setPasswordStyle({ color: "green" }))
    .catch(err => {
      setPasswordStyle({ color: "red" })
    })
  }, [email.current.value, password.current.value])

  const handleSubmit = () => {
    const eVal = email.current.value
    const pVal = password.current.value

    validateEmail(eVal)
    .then(() => validatePassword(pVal))
    .then(() => signInUser(eVal, pVal))
    .then(() => dismiss())
    .catch(err => setError(err))
  }

  return (
    <React.Fragment>
      <div className="title">
        <h3>LOGIN</h3>
        <p className="error">{error}</p>
      </div>
      <FormInput
        reference={email}
        labelText="email"
        style={emailStyle}
      />
      <FormInput
        reference={password}
        labelText="password"
        style={passwordStyle}
        type="password"
      />
      <div className="buttons">
        <button
          onClick={() => setMode("create")}
          className="btn btn-bold-muted">
          CREATE
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-bold-red">
          SUBMIT
        </button>
      </div>
    </React.Fragment>
  )
}

function CreateContent({ setMode, dismiss }) {
  const [error, setError] = React.useState(null)
  const email = React.useRef(null)
  const confirmEmail = React.useRef(null)
  const password = React.useRef(null)
  const confirmPassword = React.useRef(null)
  const firstName = React.useRef(null)
  const lastName = React.useRef(null)

  const handleCreate = () => {
    const eVal = email.current.value
    const pVal = password.current.value
    const firstVal = firstName.current.value
    const lastVal = lastName.current.value

    confirmNotEmpty([firstVal, lastVal, eVal, pVal])
    .then(() => confirmMatch(eVal, confirmEmail.current.value, "email"))
    .then(() => confirmMatch(pVal, confirmPassword.current.value, "password"))
    .then(() => validateEmail(eVal))
    .then(() => validatePassword(pVal))
    .then(() => createAccount(eVal, pVal))
    .then(() => addName(firstVal, lastVal))
    .then(() => dismiss())
    .catch(err => setError(err))
  }

  return (
    <React.Fragment>
      <div className="title">
        <h3>CREATE</h3>
        <p className="error">{error}</p>
      </div>
      <FormInput
        reference={firstName}
        labelText="first name"
      />
      <FormInput
        reference={lastName}
        labelText="last name"
      />
      <FormInput
        reference={email}
        labelText="email"
      />
      <FormInput
        reference={confirmEmail}
        labelText="confirm email"
      />
      <FormInput
        reference={password}
        type="password"
        labelText="password"
      />
      <FormInput
        type="password"
        reference={confirmPassword}
        labelText="confirm password"
      />
      <div className="buttons">
        <button
          onClick={() => setMode("login")}
          className="btn btn-bold-muted">
          BACK
        </button>
        <button
          onClick={handleCreate}
          className="btn btn-bold-red">
          CREATE ACCOUNT
        </button>
      </div>
    </React.Fragment>
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
        {mode === "create" && <CreateContent setMode={setMode} dismiss={dismiss} />}
      </div>
    </div>
  )
}
