import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./scss/index.scss"

import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Info from "./pages/Info"
import About from "./pages/About"


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
          <Route exact path="/swim">
            <Info
              title="swim"
              alignment="left"
            />
          </Route>
          <Route exact path="/tennis">
            <Info
              title="tennis"
              alignment="right"
            />
          </Route>
          <Route exact path="/about" component={About}/>
          <Route render={() => (
            <div id="fourohfour">
              <h1>Uh oh! Looks like you've reached a 404. Try again.</h1>
            </div>
          )} />
        </Switch>
        <Footer />
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
