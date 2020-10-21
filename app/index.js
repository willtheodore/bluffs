import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./scss/index.scss"

import Nav from "./components/Nav"
import Home from "./pages/Home"


// Things a component can have:
// - State
// - Lifecycle
// - UI

function App() {
  const [theme, setTheme] = React.useState("light")
  const toggleTheme = () => setTheme((theme) => theme === "light" ? "dark" : "light")

  return (
    <Router>
      <React.Suspense fallback={<Home />}>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
      </React.Suspense>
    </Router>
  )
}


// Takes two params -> 1) element to render 2) where to render the element
ReactDOM.render(
  <App />,
  document.getElementById("app")
)
