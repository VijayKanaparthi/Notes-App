import { Switch, Route } from "react-router-dom"
import "./App.css"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  )
}

export default App
