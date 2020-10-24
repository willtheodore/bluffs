import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./scss/index.scss"
import { AuthProvider } from "./contexts/auth"
import firebase from "./firebase"

import Nav from "./components/Nav"
import Footer from "./components/Footer"
const Home = React.lazy(() => import("./pages/Home"))
const Info = React.lazy(() => import("./pages/Info"))
const About = React.lazy(() => import("./pages/About"))
const Contact = React.lazy(() => import("./pages/Contact"))
const Members = React.lazy(() => import("./pages/Members"))


function App() {
  const [theme, setTheme] = React.useState("light")
  const [user, setUser] = React.useState(null)
  const toggleTheme = () => setTheme((theme) => theme === "light" ? "dark" : "light")

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={user}>
        <React.Suspense fallback={<h3 style={{
          width: "100%",
          height: "100%",
          backgroundColor: "blue",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "20%"
        }}>One moment please!</h3>}>
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
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/members" component={Members} />
            <Route render={() => (
              <div id="fourohfour">
                <h1>Uh oh! Looks like you've reached a 404. Try again.</h1>
              </div>
            )} />
          </Switch>
          <Footer />
        </div>
        </React.Suspense>
      </AuthProvider>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
