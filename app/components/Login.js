import React from "react"

export default function Login() {
  const email = React.useRef("")
  const password = React.useRef("")

  return (
    <div className="modal-window login">
      <div className="title">
        <h3>LOGIN</h3>
      </div>
      <div className="email login-input">
        <label
          htmlFor="email">
          email
        </label>
        <input
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
          type="password"
          id="password"
          ref={password} />
      </div>
      <div className="buttons">
        <button
          className="btn create">
          CREATE
        </button>
        <button
          className="btn submit">
          SUBMIT
        </button>
      </div>
    </div>
  )
}
